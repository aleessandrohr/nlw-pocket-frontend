import type { CreateGoalForm } from "@/schemas/create-goal-form";
import { api } from "@/services/api";

export const createGoal = async ({
	title,
	desiredWeeklyFrequency,
}: CreateGoalForm) => {
	try {
		const response = await api.post("/goal", {
			title,
			desiredWeeklyFrequency,
		});

		return response.data;
	} catch (error) {
		console.error(error);

		throw error;
	}
};
