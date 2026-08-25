import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	CalendarDays,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	ListChecks,
	Loader2,
	MoreHorizontal,
	Plus,
	Undo2,
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AccountHeader } from '@/components/account-header'
import { PendingGoals } from '@/components/pending-goals'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { InOrbitIcon } from '@/components/ui/in-orbit-icon'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { useAuth } from '@/contexts/auth'
import { useWeek } from '@/contexts/week'
import { deleteGoalCompletion } from '@/http/goals/delete-goal-completion'
import { getSummary } from '@/http/summary/get-summary'
import dayjs from '@/lib/dayjs'
import { queryKeys } from '@/lib/query-keys'

interface SummaryProps {
	onOpenCreateGoal: () => void
	onOpenGoals: () => void
}

type SummaryView = 'goals' | 'week'

// Exibe o resumo semanal e mantém as ações da conta no cabeçalho próprio.
export const Summary = ({ onOpenCreateGoal, onOpenGoals }: SummaryProps) => {
	const queryClient = useQueryClient()
	const { user } = useAuth()
	const { goToNextWeek, goToPreviousWeek, isCurrentWeek, week } = useWeek()
	const [view, setView] = useState<SummaryView>('goals')

	const deleteGoalCompletionMutation = useMutation({
		mutationFn: deleteGoalCompletion,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: queryKeys.summary.all() }),
				queryClient.invalidateQueries({
					queryKey: queryKeys.pendingGoals.all(),
				}),
			])

			toast.success('Conclusão desmarcada com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao desmarcar conclusão!')
		},
	})

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
		<div className="mx-auto flex h-dvh max-w-[480px] flex-col overflow-hidden px-5 pt-10">
			<header className="sticky top-0 z-10 flex shrink-0 flex-col gap-6 bg-zinc-950 pb-4">
				<AccountHeader user={user} />
				<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<div className="flex w-full min-w-0 items-center gap-2 md:w-auto">
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
						<span className="min-w-0 flex-1 whitespace-nowrap text-center font-semibold text-lg capitalize">
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
					<div className="order-first flex w-full items-center gap-2 md:order-none md:w-auto">
						<DialogTrigger asChild>
							<Button
								className="min-w-0 flex-1 truncate md:flex-none"
								size="sm"
								onClick={onOpenCreateGoal}
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
					<div
						className="my-2 hidden border-zinc-800 border-b md:flex"
						role="tablist"
						aria-label="Visualização do resumo"
					>
						<button
							id="summary-goals-tab"
							type="button"
							role="tab"
							aria-selected={view === 'goals'}
							aria-controls="summary-tab-panel"
							onClick={() => setView('goals')}
							className={`flex items-center gap-2 border-b-2 px-3 pb-3 text-sm transition-colors ${
								view === 'goals'
									? 'border-violet-500 text-zinc-100'
									: 'border-transparent text-zinc-500 hover:text-zinc-300'
							}`}
						>
							<ListChecks className="size-4" />
							Metas
						</button>
						<button
							id="summary-week-tab"
							type="button"
							role="tab"
							aria-selected={view === 'week'}
							aria-controls="summary-tab-panel"
							onClick={() => setView('week')}
							className={`flex items-center gap-2 border-b-2 px-3 pb-3 text-sm transition-colors ${
								view === 'week'
									? 'border-violet-500 text-zinc-100'
									: 'border-transparent text-zinc-500 hover:text-zinc-300'
							}`}
						>
							<CalendarDays className="size-4" />
							Semana
						</button>
					</div>
				</div>
			</header>
			<div
				id="summary-tab-panel"
				role="tabpanel"
				aria-labelledby={
					view === 'goals' ? 'summary-goals-tab' : 'summary-week-tab'
				}
				className="scrollbar-modern min-h-0 flex-1 overflow-y-auto overflow-x-hidden pt-2 pb-10"
			>
				{view === 'goals' ? (
					<PendingGoals />
				) : (
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
													<li
														key={goal.id}
														className="flex min-h-8 items-center justify-between gap-3"
													>
														<div className="flex min-w-0 items-center gap-2">
															<CheckCircle2 className="size-4 shrink-0 text-pink-500" />
															<span className="text-sm text-zinc-400">
																Você completou "
																<span className="text-zinc-100">
																	{goal.title}
																</span>
																" às{' '}
																<span className="text-zinc-100">{time}</span>
															</span>
														</div>
														<div className="flex size-8 shrink-0 items-center justify-center">
															{isCurrentWeek && !goal.isArchived && (
																<Button
																	variant="secondary"
																	size="sm"
																	type="button"
																	className="size-8 p-0"
																	aria-label={`Desmarcar conclusão de ${goal.title}`}
																	title="Desmarcar conclusão"
																	data-tooltip-id="tooltip"
																	data-tooltip-content="Desmarcar conclusão"
																	disabled={
																		deleteGoalCompletionMutation.isPending
																	}
																	onClick={() =>
																		deleteGoalCompletionMutation.mutate(goal.id)
																	}
																>
																	{deleteGoalCompletionMutation.isPending &&
																	deleteGoalCompletionMutation.variables ===
																		goal.id ? (
																		<Loader2 className="size-4 animate-spin" />
																	) : (
																		<Undo2 className="size-4" />
																	)}
																</Button>
															)}
														</div>
													</li>
												)
											})}
										</ul>
									</div>
								)
							})}
						{!summary.goalsPerDay && (
							<p className="text-sm text-zinc-500">
								Nenhuma conclusão registrada nesta semana.
							</p>
						)}
					</div>
				)}
			</div>
			<nav
				className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
				aria-label="Navegação do resumo"
			>
				<div className="pointer-events-auto mx-auto flex w-fit items-center gap-1 rounded-full border border-white/10 bg-zinc-900/75 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
					<button
						type="button"
						aria-label="Metas"
						aria-pressed={view === 'goals'}
						title="Metas"
						onClick={() => setView('goals')}
						className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs transition-colors ${
							view === 'goals'
								? 'bg-violet-500/15 text-violet-200 shadow-inner shadow-violet-500/10'
								: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
						}`}
					>
						<ListChecks className="size-4" />
						Metas
					</button>
					<button
						type="button"
						aria-label="Semana"
						aria-pressed={view === 'week'}
						title="Semana"
						onClick={() => setView('week')}
						className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs transition-colors ${
							view === 'week'
								? 'bg-violet-500/15 text-violet-200 shadow-inner shadow-violet-500/10'
								: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
						}`}
					>
						<CalendarDays className="size-4" />
						Semana
					</button>
				</div>
			</nav>
		</div>
	)
}
