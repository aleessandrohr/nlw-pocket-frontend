import axios from 'axios'
import type { User } from '@/contexts/auth'
import { env } from '@/schemas/env'

// Solicita ao backend uma conta demo e mantém os cookies de sessão no navegador.
export const createDemoSession = async () => {
	try {
		const response = await axios.post<User>(
			`${env.VITE_BACKEND_URL}/auth/demo`,
			undefined,
			{
				withCredentials: true,
			}
		)

		return response.data
		// biome-ignore lint/suspicious/noExplicitAny: <compatibilidade com o padrão dos fetchers atuais>
	} catch (error: any) {
		console.error(error)

		throw {
			message: error?.message,
		}
	}
}
