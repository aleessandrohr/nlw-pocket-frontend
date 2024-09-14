import { env } from "@/schemas/env";

import type { CreateGoalForm } from "@/schemas/create-goal-form";

export const createGoal = async ({
	title,
	desiredWeeklyFrequency,
}: CreateGoalForm) => {
	const response = await fetch(`${env.VITE_BACKEND_URL}/goal`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
			desiredWeeklyFrequency,
		}),
	});

	return response;
};
