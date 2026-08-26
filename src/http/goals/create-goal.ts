import type { CreateGoalForm } from '@/schemas/create-goal-form'
import { api } from '@/services/api'

// Cria uma meta e delega o tratamento de falha ao fluxo visual que a chamou.
export const createGoal = async ({
	title,
	desiredWeeklyFrequency,
}: CreateGoalForm) => {
	const response = await api.post('/goal', {
		title,
		desiredWeeklyFrequency,
	})

	return response.data
}
