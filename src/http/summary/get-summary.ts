import { api } from '@/services/api'

interface Goal {
	id: string
	title: string
	completedAt: Date
}

interface GoalsInWeek {
	completed: number
	total: number
	goalsPerDay: {
		[date: string]: Array<Goal>
	}
}

export const getSummary = async (week: number): Promise<GoalsInWeek> => {
	try {
		const response = await api.get<GoalsInWeek>('/summary', {
			params: { week },
		})

		const data = response.data
		return data
	} catch (error) {
		console.error(error)

		throw error
	}
}
