import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Loader2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useWeek } from '@/contexts/week'
import { createGoalCompletion } from '@/http/goals/create-goal-completion'
import { getPendingGoals } from '@/http/goals/get-pending-goals'
import { queryKeys } from '@/lib/query-keys'

// Exibe as metas em cards compactos e preserva o bloqueio do histórico.
export const PendingGoals = () => {
	const queryClient = useQueryClient()

	const { week } = useWeek()

	const canCompleteGoal = week === 0

	const { data: pendingGoals } = useQuery({
		queryKey: queryKeys.pendingGoals.byWeek(week),
		queryFn: () => getPendingGoals(week),
		placeholderData: previousGoals => previousGoals,
	})

	const createGoalCompletionMutation = useMutation({
		mutationFn: createGoalCompletion,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.summary.all(),
			})
			queryClient.invalidateQueries({
				queryKey: queryKeys.pendingGoals.all(),
			})
			toast.success('Meta completada com sucesso!')

			createGoalCompletionMutation.reset()
		},
		onError: () => {
			toast.error('Erro ao completar meta!')
		},
	})

	const handleCompleteGoal = async (goalId: string) => {
		if (!canCompleteGoal) return

		createGoalCompletionMutation.mutate({ goalId, week })
	}

	if (!pendingGoals) return null

	// Mantém metas disponíveis no topo e ordena cada grupo alfabeticamente pelo título.
	const sortedPendingGoals = [...pendingGoals].sort((goalA, goalB) => {
		const isGoalACompleted =
			goalA.completionCount >= goalA.desiredWeeklyFrequency
		const isGoalBCompleted =
			goalB.completionCount >= goalB.desiredWeeklyFrequency
		const isGoalADisabled =
			!canCompleteGoal || isGoalACompleted || goalA.completedToday
		const isGoalBDisabled =
			!canCompleteGoal || isGoalBCompleted || goalB.completedToday

		if (isGoalADisabled !== isGoalBDisabled) {
			return Number(isGoalADisabled) - Number(isGoalBDisabled)
		}

		return goalA.title.localeCompare(goalB.title, 'pt-BR', {
			sensitivity: 'base',
		})
	})

	return (
		<div className="flex flex-col gap-3">
			<div>
				<h2 className="font-medium text-sm text-zinc-100">Metas da semana</h2>
				<p className="mt-1 text-xs text-zinc-500">
					{canCompleteGoal
						? 'Registre uma conclusão para atualizar seu progresso.'
						: 'Semanas anteriores são apenas histórico.'}
				</p>
			</div>
			<div className="grid gap-3 sm:grid-cols-2">
				{sortedPendingGoals.map(goal => {
					const isCompletedThisWeek =
						goal.completionCount >= goal.desiredWeeklyFrequency
					const isDisabled =
						!canCompleteGoal || isCompletedThisWeek || goal.completedToday
					const isCompleting =
						createGoalCompletionMutation.isPending &&
						createGoalCompletionMutation.variables?.goalId === goal.id

					return (
						<button
							key={goal.id}
							type="button"
							disabled={
								isDisabled ||
								createGoalCompletionMutation.isPending ||
								createGoalCompletionMutation.isSuccess
							}
							onClick={() => handleCompleteGoal(goal.id)}
							aria-label={
								!canCompleteGoal
									? `${goal.title}, somente histórico`
									: goal.completedToday
										? `${goal.title}, já concluída hoje`
										: isCompletedThisWeek
											? `${goal.title}, meta concluída nesta semana`
											: `Concluir meta ${goal.title}`
							}
							title={
								!canCompleteGoal
									? 'Semanas anteriores são apenas histórico!'
									: goal.completedToday
										? 'Meta já concluída hoje!'
										: isCompletedThisWeek
											? 'Meta concluída nesta semana!'
											: undefined
							}
							className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-left outline-none transition-colors hover:border-violet-500/50 hover:bg-zinc-900 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<span className="min-w-0">
								<span className="block truncate font-medium text-sm text-zinc-100">
									{goal.title}
								</span>
								<span className="mt-1 block text-xs text-zinc-500">
									{goal.completionCount}/{goal.desiredWeeklyFrequency}{' '}
									conclusões nesta semana
								</span>
							</span>
							<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-violet-500/15 group-hover:text-violet-300">
								{isCompleting ? (
									<Loader2 className="size-4 animate-spin" />
								) : isCompletedThisWeek || goal.completedToday ? (
									<CheckCircle2 className="size-4 text-emerald-400" />
								) : (
									<Plus className="size-4" />
								)}
							</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}
