import { api } from '@/services/api'

interface GetCrsfTokenResponse {
	csrfToken: string
}

export const getCsrfToken = async () => {
	const response = await api.get<GetCrsfTokenResponse>('/auth/csrf-token')

	return response.data
}
