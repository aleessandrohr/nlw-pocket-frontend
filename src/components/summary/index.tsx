import { useQuery } from '@tanstack/react-query'
import {
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Plus,
} from 'lucide-react'
import { AccountHeader } from '@/components/account-header'
import { PendingGoals } from '@/components/pending-goals'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { InOrbitIcon } from '@/components/ui/in-orbit-icon'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth'
import { useWeek } from '@/contexts/week'
import { getSummary } from '@/http/summary/get-summary'
import dayjs from '@/lib/dayjs'
import { queryKeys } from '@/lib/query-keys'

interface SummaryProps {
	onOpenCreateGoal: () => void
	onOpenGoals: () => void
}

// Exibe o resumo semanal e mantém as ações da conta no cabeçalho próprio.
export const Summary = ({ onOpenCreateGoal, onOpenGoals }: SummaryProps) => {
	const { user } = useAuth()
	const { goToNextWeek, goToPreviousWeek, isCurrentWeek, week } = useWeek()

	const { data: summary } = useQuery({
		queryKey: queryKeys.summary.byWeek(week),
		queryFn: () => getSummary(week),
		placeholderData: previousSummary => previousSummary,
		staleTime: 1000 * 60, // 60 seconds
	})

	if (!summary || !user) return null

	const firstDayOfWeek = dayjs()
		.startOf('day')
		.day(0)
		.add(week, 'week')
		.format('D MMM')
	const lastDayOfWeek = dayjs()
		.startOf('day')
		.day(0)
		.add(week, 'week')
		.add(6, 'day')
		.format('D MMM')

	const completedPercentage = Math.round(
		(summary.completed * 100) / summary.total
	)

	return (
		<div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10">
			<AccountHeader user={user} />
			<div className="flex items-end justify-between">
				<div className="flex min-w-0 items-center gap-2">
					<InOrbitIcon />
					<Button
						variant="secondary"
						size="sm"
						type="button"
						className="size-8 shrink-0 p-0"
						aria-label="Semana anterior"
						onClick={goToPreviousWeek}
						data-tooltip-id="tooltip"
						data-tooltip-content="Semana anterior"
					>
						<ChevronLeft className="size-4" />
					</Button>
					<span className="whitespace-nowrap font-semibold text-lg capitalize">
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
					<Button
						variant="secondary"
						size="sm"
						type="button"
						className="size-8 shrink-0 p-0"
						aria-label="Próxima semana"
						disabled={isCurrentWeek}
						onClick={goToNextWeek}
						data-tooltip-id="tooltip"
						data-tooltip-content="Próxima semana"
					>
						<ChevronRight className="size-4" />
					</Button>
				</div>
				<div className="flex flex-col items-end justify-end gap-2 md:flex-row">
					<DialogTrigger asChild>
						<Button
							className="truncate"
							size="sm"
							onClick={onOpenCreateGoal}
							data-tooltip-id="tooltip"
							data-tooltip-content="Cadastrar meta"
						>
							<Plus className="size-4" />
							Cadastrar meta
						</Button>
					</DialogTrigger>
					<Button
						variant="secondary"
						size="sm"
						type="button"
						className="size-9 p-0"
						aria-label="Mais opções de meta"
						onClick={onOpenGoals}
						data-tooltip-id="tooltip"
						data-tooltip-content="Mais opções de meta"
					>
						<MoreHorizontal className="size-4" />
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Progress value={summary.completed} max={summary.total}>
					<ProgressIndicator style={{ width: `${completedPercentage}%` }} />
				</Progress>
				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span>
						Você completou{' '}
						<span className="text-zinc-100">{summary.completed}</span> de{' '}
						<span className="text-zinc-100">{summary.total}</span> metas nessa
						semana.
					</span>
					<span>{completedPercentage}%</span>
				</div>
				<Separator />
				<PendingGoals />
				<div className="flex flex-col gap-6">
					<h2 className="font-medium text-xl">Sua semana</h2>
					{summary.goalsPerDay &&
						Object.entries(summary.goalsPerDay).map(([date, goals]) => {
							const weekDay = dayjs(date).format('dddd')
							const formattedDate = dayjs(date).format('D [de] MMMM')

							return (
								<div key={date} className="flex flex-col gap-4">
									<h3 className="font-medium">
										<span className="capitalize">{weekDay}</span>{' '}
										<span className="text-xs text-zinc-400">
											({formattedDate})
										</span>
									</h3>
									<ul className="flex flex-col gap-3">
										{goals.map(goal => {
											const time = dayjs(goal.completedAt).format('HH:mm')

											return (
												<li key={goal.id} className="flex items-center gap-2">
													<CheckCircle2 className="size-4 text-pink-500" />
													<span className="text-sm text-zinc-400">
														Você completou "
														<span className="text-zinc-100">{goal.title}</span>"
														às <span className="text-zinc-100">{time}</span>
													</span>
												</li>
											)
										})}
									</ul>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}
