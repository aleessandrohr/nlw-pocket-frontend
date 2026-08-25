import axios from 'axios'
import type { User } from '@/contexts/auth'
import { env } from '@/schemas/env'

interface LoginRequest {
	name: string
	email: string
	password: string
}

type LoginResponse = User

export const createUser = async ({ name, email, password }: LoginRequest) => {
	const response = await axios.post<LoginResponse>(
		`${env.VITE_BACKEND_URL}/auth/create-user`,
		{
			name,
			email,
			password,
		},
		{
			withCredentials: true,
		}
	)

	return response.data
}
