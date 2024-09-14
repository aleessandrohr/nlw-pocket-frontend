import { env } from "@/schemas/env";

interface Goal {
	id: string;
	title: string;
	completedAt: Date;
}

interface GoalsInWeek {
	completed: number;
	total: number;
	goalsPerDay: {
		[date: string]: Array<Goal>;
	};
}

export const getSummary = async (): Promise<GoalsInWeek> => {
	const response = await fetch(`${env.VITE_BACKEND_URL}/summary`);
	const data = await response.json();

	return data;
};
