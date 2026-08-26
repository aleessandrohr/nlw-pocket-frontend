import type { User } from '@/contexts/auth'
import { api } from '@/services/api'

interface LoginRequest {
	email: string
	password: string
}

type LoginResponse = User

export const login = async ({ email, password }: LoginRequest) => {
	const response = await api.post<LoginResponse>(
		'/auth/login',
		{
			email,
			password,
		},
		{ skipAuthRefresh: true }
	)

	return response.data
}
