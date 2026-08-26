import axios, { type InternalAxiosRequestConfig } from 'axios'
import { CSRF_HEADER_NAME, METHODS_THAT_NEED_CSRF } from '@/config'
import { getCsrfToken } from '@/http/auth/csrf-token/get'
import { getNewAccessToken } from '@/http/auth/refresh-token/post'
import { env } from '@/schemas/env'

let csrfTokenInMemory: string | null = null

// Mantém o token apenas em memória e permite removê-lo ao encerrar a sessão.
export const setCsrfTokenInMemory = (csrfToken: string | null) => {
	csrfTokenInMemory = csrfToken
}

const api = axios.create({
	baseURL: env.VITE_BACKEND_URL,
	withCredentials: true,
	timeout: 15_000,
})

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (METHODS_THAT_NEED_CSRF.includes(config.method?.toUpperCase() ?? '')) {
			if (csrfTokenInMemory) {
				config.headers[CSRF_HEADER_NAME] = csrfTokenInMemory
			}
		}

		return config
	},
	error => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: Array<{
	resolve: (value: unknown) => void
	reject: (error: unknown) => void
}> = []

// Resolve ou rejeita todas as requisições que aguardavam a renovação do token.
const processQueue = (error: unknown) => {
	for (const prom of failedQueue) {
		if (error) {
			prom.reject(error)

			continue
		}

		prom.resolve(undefined)
	}

	failedQueue = []
}

const refreshSession = async () => {
	const { csrfToken } = await getCsrfToken()

	setCsrfTokenInMemory(csrfToken)

	await getNewAccessToken()
}

// Abas compartilham os cookies, mas não o estado `isRefreshing`. O lock evita
// que duas delas rotacionem o mesmo refresh token ao mesmo tempo.
const refreshSessionAcrossTabs = async () => {
	if (typeof navigator !== 'undefined' && navigator.locks) {
		await navigator.locks.request('pocket-auth-refresh', refreshSession)

		return
	}

	await refreshSession()
}

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			originalRequest &&
			originalRequest.url !== '/auth/refresh-token' &&
			!originalRequest.skipAuthRefresh &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				}).then(() => api(originalRequest))
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				await refreshSessionAcrossTabs()

				processQueue(null)

				return api(originalRequest)
			} catch (refreshError) {
				processQueue(refreshError)

				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export { api }
