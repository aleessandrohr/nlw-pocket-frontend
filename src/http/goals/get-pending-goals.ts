import { api } from '@/services/api'

export interface PendingGoal {
	id: string
	title: string
	desiredWeeklyFrequency: number
	completionCount: number
}

export const getPendingGoals = async (): Promise<Array<PendingGoal>> => {
	try {
		const response = await api.get<Array<PendingGoal>>('/pending-goals')

		return response.data
	} catch (error) {
		console.error(error)

		throw error
	}
}
