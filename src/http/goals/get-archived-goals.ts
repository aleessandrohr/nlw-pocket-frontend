import { api } from '@/services/api'

export interface ArchivedGoal {
	id: string
	title: string
	desiredWeeklyFrequency: number
	isArchived: boolean
	archivedAt: string
	createdAt: string
	completionCount: number
}

// Busca as metas arquivadas para permitir consulta e restauração no diálogo.
export const getArchivedGoals = async (): Promise<Array<ArchivedGoal>> => {
	const response = await api.get<Array<ArchivedGoal>>('/archived-goals')

	return response.data
}
