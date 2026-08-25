import type { User } from '@/contexts/auth'
import { api } from '@/services/api'

type GetUserProfileResponse = User

export const getUserProfile = async () => {
	const response = await api.get<GetUserProfileResponse>('/user/profile')

	return response.data
}
