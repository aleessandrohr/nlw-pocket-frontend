import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AuthenticatedRoute } from '@/components/authenticated-route'
import { NotAuthenticatedRoute } from '@/components/not-authenticated-route'
import { useAuth } from '@/contexts/auth'
import { Logout } from './private/auth/logout'
import { SummaryRoute } from './private/summary'
import { ProfileRoute } from './private/user/profile'
import { CreateUserRoute } from './public/auth/create-user'
import { DemoRoute } from './public/auth/demo'
import { LoginRoute } from './public/auth/login'

// Registra as rotas públicas e privadas, incluindo a entrada da demonstração.
export const RoutesProvider = () => {
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === '/') {
			if (isAuthenticated) navigate('/summary', { replace: true })
			else navigate('/auth/login', { replace: true })
		}
	}, [location.pathname, isAuthenticated, navigate])

	return (
		<Routes>
			<Route
				path="/auth/create-user"
				element={
					<NotAuthenticatedRoute>
						<CreateUserRoute />
					</NotAuthenticatedRoute>
				}
			/>
			<Route
				path="/auth/login"
				element={
					<NotAuthenticatedRoute>
						<LoginRoute />
					</NotAuthenticatedRoute>
				}
			/>
			<Route
				path="/demo"
				element={
					<NotAuthenticatedRoute>
						<DemoRoute />
					</NotAuthenticatedRoute>
				}
			/>
			<Route
				path="/auth/logout"
				element={
					<AuthenticatedRoute>
						<Logout />
					</AuthenticatedRoute>
				}
			/>
			<Route
				path="/summary"
				element={
					<AuthenticatedRoute>
						<SummaryRoute />
					</AuthenticatedRoute>
				}
			/>
			<Route
				path="/user/profile"
				element={
					<AuthenticatedRoute>
						<ProfileRoute />
					</AuthenticatedRoute>
				}
			/>
		</Routes>
	)
}
