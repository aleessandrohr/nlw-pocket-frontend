import { useQueryClient } from '@tanstack/react-query'
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loading } from '@/components/loading'
import { useWeek } from '@/contexts/week'
import { getCsrfToken } from '@/http/auth/csrf-token/get'
import { getUserProfile } from '@/http/user/get'
import { setCsrfTokenInMemory } from '@/services/api'

export interface User {
	id: string
	name: string
	email: string
	isDemo: boolean
	demoExpiresAt: string | null
	updatedAt: string
	createdAt: string
}

interface AuthContextType {
	user: User | null | undefined
	loginInMemory: (user: User, csrfToken: string, redirect?: boolean) => void
	logoutInMemory: (redirectTo?: string) => void
	isLoading: boolean
	isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loginInMemory: () => {},
	logoutInMemory: () => {},
	isLoading: true,
	isAuthenticated: false,
})

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const queryClient = useQueryClient()

	const navigate = useNavigate()
	const location = useLocation()
	const { setWeek } = useWeek()

	const [user, setUser] = useState<User | null | undefined>(undefined)
	const [csrfToken, setCsrfToken] = useState<string | null>(null)

	const loginInMemory = useCallback(
		async (user: User, csrfToken: string, redirect = true) => {
			setUser(user)
			setCsrfToken(csrfToken)

			if (!redirect) return

			navigate('/', { replace: true })
		},
		[navigate]
	)

	// Limpa sessão, semana e cache para impedir que outra conta reutilize dados anteriores.
	const logoutInMemory = useCallback(
		(redirectTo = '/auth/login') => {
			setUser(null)
			setCsrfToken(null)
			setCsrfTokenInMemory(null)
			setWeek(0)

			queryClient.clear()

			if (
				location.pathname === '/auth/create-user' ||
				location.pathname === '/auth/login' ||
				location.pathname === '/demo'
			)
				return

			navigate(redirectTo, { replace: true })
		},
		[location.pathname, navigate, queryClient, setWeek]
	)

	useEffect(() => {
		if (user !== undefined) return

		const checkSession = async () => {
			try {
				const user = await getUserProfile()
				const { csrfToken } = await getCsrfToken()

				loginInMemory(user, csrfToken, false)
			} catch (_error) {
				logoutInMemory()
			}
		}

		checkSession()
	}, [logoutInMemory, loginInMemory, user])

	useEffect(() => {
		if (!csrfToken) return

		setCsrfTokenInMemory(csrfToken)
	}, [csrfToken])

	const isLoading = user === undefined
	const isAuthenticated = !!user

	if (isLoading) return <Loading />

	return (
		<AuthContext.Provider
			value={{
				user,
				loginInMemory,
				logoutInMemory,
				isLoading,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}

	const { user, loginInMemory, logoutInMemory, isLoading, isAuthenticated } =
		context

	return {
		user,
		loginInMemory,
		logoutInMemory,
		isLoading,
		isAuthenticated,
	}
}
