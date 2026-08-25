import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CreateGoal } from '@/components/create-goal'
import { EmptyGoals } from '@/components/empty-goals'
import { GoalsDialog } from '@/components/goals-dialog'
import { Summary } from '@/components/summary'
import { Dialog } from '@/components/ui/dialog'
import { useWeek } from '@/contexts/week'
import { getSummary } from '@/http/summary/get-summary'
import { queryKeys } from '@/lib/query-keys'

export const SummaryRoute = () => {
	const { week } = useWeek()
	const [open, setOpen] = useState(false)
	const [dialogContent, setDialogContent] = useState<'create' | 'goals'>(
		'create'
	)

	const { data: summary, isLoading: isLoadingSummary } = useQuery({
		queryKey: queryKeys.summary.byWeek(week),
		queryFn: () => getSummary(week),
		staleTime: 1000 * 60, // 60 seconds
	})

	if (isLoadingSummary) return null

	return (
		<Dialog open={open} defaultOpen={false} onOpenChange={setOpen}>
			{summary && summary.total > 0 ? (
				<Summary
					onOpenCreateGoal={() => setDialogContent('create')}
					onOpenGoals={() => {
						setDialogContent('goals')
						setOpen(true)
					}}
				/>
			) : (
				<EmptyGoals />
			)}
			{dialogContent === 'create' ? (
				<CreateGoal setOpen={setOpen} />
			) : (
				<GoalsDialog open={open} />
			)}
		</Dialog>
	)
}
