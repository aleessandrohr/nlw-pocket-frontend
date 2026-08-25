const summaryKey = 'get-summary'
const pendingGoalsKey = 'get-pending-goals'
const archivedGoalsKey = 'get-archived-goals'
const userKey = 'user'

// Centraliza as chaves para preservar o escopo das queries e facilitar novas dimensões.
export const queryKeys = {
	summary: {
		all: () => [summaryKey] as const,
		byWeek: (week: number) => [summaryKey, week] as const,
	},
	pendingGoals: {
		all: () => [pendingGoalsKey] as const,
		byWeek: (week: number) => [pendingGoalsKey, week] as const,
	},
	archivedGoals: () => [archivedGoalsKey] as const,
	user: () => [userKey] as const,
}
