import { env } from "@/schemas/env";

export const createGoalCompletion = async (goalId: string) => {
	const response = await fetch(`${env.VITE_BACKEND_URL}/completion`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			goalId,
		}),
	});

	return response;
};
