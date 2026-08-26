import { setCsrfTokenInMemory } from '@/services/api'
import { getCsrfToken } from './get'

// Cria ou renova o token CSRF antes de uma mutation que inicia uma sessão.
export const refreshCsrfToken = async () => {
	const { csrfToken } = await getCsrfToken()

	setCsrfTokenInMemory(csrfToken)

	return csrfToken
}
