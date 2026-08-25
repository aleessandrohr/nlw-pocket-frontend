import axios from 'axios'
import type { User } from '@/contexts/auth'
import { env } from '@/schemas/env'

interface LoginRequest {
	email: string
	password: string
}

type LoginResponse = User

export const login = async ({ email, password }: LoginRequest) => {
	const response = await axios.post<LoginResponse>(
		`${env.VITE_BACKEND_URL}/auth/login`,
		{
			email,
			password,
		},
		{
			withCredentials: true,
		}
	)

	return response.data
}
