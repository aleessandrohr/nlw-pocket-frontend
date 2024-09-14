import { env } from "@/schemas/env";

interface PendingGoals {
	id: string;
	title: string;
	desiredWeeklyFrequency: number;
	completionCount: number;
}

export const getPendingGoals = async (): Promise<Array<PendingGoals>> => {
	const response = await fetch(`${env.VITE_BACKEND_URL}/pending-goals`);
	const data = await response.json();

	return data;
};
