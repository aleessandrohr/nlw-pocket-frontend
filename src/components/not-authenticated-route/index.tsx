import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'

interface NotAuthenticatedRouteProps {
	children: React.ReactNode
}

export const NotAuthenticatedRoute = ({
	children,
}: NotAuthenticatedRouteProps) => {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) return <Navigate to="/" replace />

	return children
}
