import { api } from '@/services/api'

// Desarquiva uma meta e reativa suas conclusões no backend.
export const unarchiveGoal = async (goalId: string) => {
	const response = await api.post(`/goal/${goalId}/unarchive`)

	return response.data
}
