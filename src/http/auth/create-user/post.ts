import type { User } from '@/contexts/auth'
import { api } from '@/services/api'

interface LoginRequest {
	name: string
	email: string
	password: string
}

type LoginResponse = User

export const createUser = async ({ name, email, password }: LoginRequest) => {
	const response = await api.post<LoginResponse>(
		'/auth/create-user',
		{
			name,
			email,
			password,
		},
		{ skipAuthRefresh: true }
	)

	return response.data
}
