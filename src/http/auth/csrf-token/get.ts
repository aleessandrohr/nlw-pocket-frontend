import { api } from '@/services/api'

interface GetCrsfTokenResponse {
	csrfToken: string
}

export const getCsrfToken = async () => {
	try {
		const response = await api.get<GetCrsfTokenResponse>('/auth/csrf-token')

		return response.data
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(error)

		throw new Error(error?.message)
	}
}
