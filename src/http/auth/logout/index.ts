import { api } from '@/services/api'

export const logout = async () => {
	try {
		const response = await api.post('/auth/logout')

		return response.data
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(error)

		throw {
			message: error?.message,
		}
	}
}
