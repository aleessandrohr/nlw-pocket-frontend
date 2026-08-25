import { api } from '@/services/api'

// Desarquiva uma meta e reativa suas conclusões no backend.
export const unarchiveGoal = async (goalId: string) => {
	try {
		const response = await api.post(`/goal/${goalId}/unarchive`)

		return response.data
	} catch (error) {
		console.error(error)

		throw error
	}
}
