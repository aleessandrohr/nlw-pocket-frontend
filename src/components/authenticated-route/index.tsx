import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";

interface AuthenticatedRouteProps {
	children: React.ReactNode;
}

export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

	return children;
};
