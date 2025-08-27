import { api } from "@/services/api";

interface PendingGoals {
	id: string;
	title: string;
	desiredWeeklyFrequency: number;
	completionCount: number;
}

export const getPendingGoals = async (): Promise<Array<PendingGoals>> => {
	try {
		const response = await api.get<Array<PendingGoals>>("/pending-goals");

		return response.data;
	} catch (error) {
		console.error(error);

		throw error;
	}
};
