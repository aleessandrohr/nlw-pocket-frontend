import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { OutlineButton } from '@/components/ui/outline-button'
import { useWeek } from '@/contexts/week'
import { createGoalCompletion } from '@/http/goals/create-goal-completion'
import { getPendingGoals } from '@/http/goals/get-pending-goals'
import { queryKeys } from '@/lib/query-keys'

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

	return (
		<div className="flex flex-wrap gap-3">
			{pendingGoals?.map(goal => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={
							!canCompleteGoal ||
							goal.completionCount >= goal.desiredWeeklyFrequency ||
							createGoalCompletionMutation.isPending ||
							createGoalCompletionMutation.isSuccess
						}
						onClick={() => handleCompleteGoal(goal.id)}
						title={
							canCompleteGoal
								? undefined
								: 'Semanas anteriores são apenas histórico!'
						}
					>
						<Plus className="size-4 text-zinc-600" />
						{goal.title}
					</OutlineButton>
				)
			})}
		</div>
	)
}
