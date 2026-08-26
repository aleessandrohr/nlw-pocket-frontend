import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CreateGoal } from '@/components/create-goal'
import { GoalsDialog } from '@/components/goals-dialog'
import { Loading } from '@/components/loading'
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
		placeholderData: previousSummary => previousSummary,
		staleTime: 1000 * 60, // 60 seconds
	})

	if (isLoadingSummary) return <Loading />

	if (!summary) {
		return (
			<div className="flex h-dvh items-center justify-center px-5 text-center text-sm text-zinc-400">
				Não foi possível carregar o resumo. Tente atualizar a página.
			</div>
		)
	}

	return (
		<Dialog open={open} defaultOpen={false} onOpenChange={setOpen}>
			<Summary
				summary={summary}
				onOpenCreateGoal={() => {
					setDialogContent('create')
					setOpen(true)
				}}
				onOpenGoals={() => {
					setDialogContent('goals')
					setOpen(true)
				}}
			/>
			{dialogContent === 'create' ? (
				<CreateGoal setOpen={setOpen} />
			) : (
				<GoalsDialog open={open} />
			)}
		</Dialog>
	)
}
