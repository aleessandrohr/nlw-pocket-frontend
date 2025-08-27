import type { User } from "@/contexts/auth";
import { api } from "@/services/api";

type GetUserProfileResponse = User;

export const getUserProfile = async () => {
	try {
		const response = await api.get<GetUserProfileResponse>("/user/profile");

		return response.data;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(error);

		throw {
			message: error?.message,
		};
	}
};
