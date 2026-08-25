import { api } from '@/services/api'

export interface WeekCompletion {
	id: string
	title: string
	isArchived: boolean
	completedAt: string
}

export interface WeekSummary {
	completed: number
	total: number
	goalsPerDay: Record<string, Array<WeekCompletion>> | null
}

// Busca o histórico e os totais da semana selecionada sem duplicar tratamento de erro do Axios.
export const getSummary = async (week: number): Promise<WeekSummary> => {
	const response = await api.get<WeekSummary>('/summary', {
		params: { week },
	})

	return response.data
}
