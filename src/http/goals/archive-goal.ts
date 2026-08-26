import { api } from '@/services/api'

// Arquiva uma meta e suas conclusões relacionadas no backend.
export const archiveGoal = async (goalId: string) => {
	const response = await api.post(`/goal/${goalId}/archive`)

	return response.data
}
