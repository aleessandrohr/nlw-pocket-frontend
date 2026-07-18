import { api } from '@/services/api'

export const createGoalCompletion = async (goalId: string) => {
	try {
		const response = await api.post('/completion', {
			goalId,
		})

		return response.data
	} catch (error) {
		console.error(error)

		throw error
	}
}
