import { useEffect } from 'react'
import { useAuth } from '@/contexts/auth'
import { logout } from '@/http/auth/logout'

export function Logout() {
	const { logoutInMemory } = useAuth()

	useEffect(() => {
		const removeSession = async () => {
			try {
				await logout()
			} finally {
				logoutInMemory()
			}
		}

		removeSession()
	}, [logoutInMemory])

	return null
}
