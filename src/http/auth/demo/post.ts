import type { User } from '@/contexts/auth'
import { api } from '@/services/api'

// Solicita ao backend uma conta demo e mantém os cookies de sessão no navegador.
export const createDemoSession = async () => {
	const response = await api.post<User>('/auth/demo', undefined, {
		skipAuthRefresh: true,
	})

	return response.data
}
