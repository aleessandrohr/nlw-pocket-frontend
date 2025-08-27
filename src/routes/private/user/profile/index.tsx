import { getUserProfile } from "@/http/user/get";
import { useQuery } from "@tanstack/react-query";

export const ProfileRoute = () => {
	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const user = await getUserProfile();

			return user;
		},
	});

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error</div>;

	return <div>{JSON.stringify(user)}</div>;
};
