import { api } from '@/services/api'

export const getNewAccessToken = async () => {
	const response = await api.post('/auth/refresh-token')

	return response.data
}
