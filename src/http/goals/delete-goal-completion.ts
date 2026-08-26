import { api } from '@/services/api'

// Remove uma conclusão somente quando o backend confirmar que ela pertence à semana atual.
export const deleteGoalCompletion = async (completionId: string) => {
	const response = await api.delete(`/completion/${completionId}`)

	return response.data
}
