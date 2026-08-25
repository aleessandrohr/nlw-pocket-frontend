import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { PendingGoals } from '@/components/pending-goals'
import { SummaryHeader } from '@/components/summary/summary-header'
import {
	SummaryTabs,
	type SummaryView,
} from '@/components/summary/summary-tabs'
import { SummaryWeekHistory } from '@/components/summary/summary-week-history'
import { useAuth } from '@/contexts/auth'
import { deleteGoalCompletion } from '@/http/goals/delete-goal-completion'
import type { WeekCompletion, WeekSummary } from '@/http/summary/get-summary'
import { queryKeys } from '@/lib/query-keys'

interface SummaryProps {
	summary: WeekSummary
	onOpenCreateGoal: () => void
	onOpenGoals: () => void
}

interface CompletionToUndo {
	id: string
	title: string
}

// Orquestra dados, tabs e ações do resumo mantendo o cabeçalho e o histórico independentes.
export const Summary = ({
	summary,
	onOpenCreateGoal,
	onOpenGoals,
}: SummaryProps) => {
	const queryClient = useQueryClient()
	const { user } = useAuth()
	const [view, setView] = useState<SummaryView>('goals')
	const [completionToUndo, setCompletionToUndo] =
		useState<CompletionToUndo | null>(null)

	const deleteGoalCompletionMutation = useMutation({
		mutationFn: deleteGoalCompletion,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: queryKeys.summary.all() }),
				queryClient.invalidateQueries({
					queryKey: queryKeys.pendingGoals.all(),
				}),
			])

			setCompletionToUndo(null)
			toast.success('Conclusão desmarcada com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao desmarcar conclusão!')
		},
	})

	if (!user) return null

	const handleUndo = (completion: WeekCompletion) => {
		setCompletionToUndo({
			id: completion.id,
			title: completion.title,
		})
	}

	return (
		<div className="mx-auto flex h-dvh max-w-[480px] flex-col overflow-hidden px-5 pt-10">
			<ConfirmationDialog
				open={completionToUndo !== null}
				title="Desmarcar conclusão?"
				description={
					completionToUndo
						? `A conclusão de "${completionToUndo.title}" será removida de hoje.`
						: ''
				}
				confirmLabel="Desmarcar"
				pendingLabel="Desmarcando..."
				isPending={deleteGoalCompletionMutation.isPending}
				onConfirm={() => {
					if (!completionToUndo) return

					deleteGoalCompletionMutation.mutate(completionToUndo.id)
				}}
				onOpenChange={open => {
					if (!open && !deleteGoalCompletionMutation.isPending) {
						setCompletionToUndo(null)
					}
				}}
			/>
			<SummaryHeader
				user={user}
				summary={summary}
				view={view}
				onViewChange={setView}
				onOpenCreateGoal={onOpenCreateGoal}
				onOpenGoals={onOpenGoals}
			/>
			<div
				id="summary-tab-panel"
				role="tabpanel"
				aria-label={view === 'goals' ? 'Metas da semana' : 'Histórico semanal'}
				className="scrollbar-modern min-h-0 flex-1 overflow-y-auto overflow-x-hidden pt-2 pb-6"
			>
				{view === 'goals' ? (
					<PendingGoals />
				) : (
					<SummaryWeekHistory
						goalsPerDay={summary.goalsPerDay}
						isUndoPending={deleteGoalCompletionMutation.isPending}
						undoingCompletionId={deleteGoalCompletionMutation.variables}
						onUndo={handleUndo}
					/>
				)}
			</div>
			<nav
				className="sticky bottom-0 z-30 flex shrink-0 justify-center px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
				aria-label="Navegação do resumo"
			>
				<SummaryTabs view={view} variant="glass" onViewChange={setView} />
			</nav>
		</div>
	)
}
