import { api } from '@/services/api'

export interface PendingGoal {
	id: string
	title: string
	desiredWeeklyFrequency: number
	completionCount: number
	completedToday: boolean
}

export const getPendingGoals = async (
	week: number
): Promise<Array<PendingGoal>> => {
	const response = await api.get<Array<PendingGoal>>('/pending-goals', {
		params: { week },
	})

	return response.data
}
