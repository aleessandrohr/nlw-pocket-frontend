import { useAuth } from "@/contexts/auth";
import { logout } from "@/http/auth/logout";
import { useEffect } from "react";

export function Logout() {
	const { logoutInMemory } = useAuth();

	useEffect(() => {
		const removeSession = async () => {
			try {
				await logout();
			} finally {
				logoutInMemory();
			}
		};

		removeSession();
	}, [logoutInMemory]);

	return null;
}
