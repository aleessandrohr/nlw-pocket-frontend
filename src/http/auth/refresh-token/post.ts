import { api } from '@/services/api'

export const getNewAccessToken = async () => {
	try {
		const response = await api.post('/auth/refresh-token')

		return response.data
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(error)

		throw {
			message: error?.message,
		}
	}
}
