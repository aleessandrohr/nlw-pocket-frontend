import { api } from '@/services/api'

interface CreateGoalCompletionRequest {
	goalId: string
	week: number
}

// Envia a semana visível para impedir conclusões fora da semana atual.
export const createGoalCompletion = async ({
	goalId,
	week,
}: CreateGoalCompletionRequest) => {
	try {
		const response = await api.post('/completion', {
			goalId,
			week,
		})

		return response.data
	} catch (error) {
		console.error(error)

		throw error
	}
}
