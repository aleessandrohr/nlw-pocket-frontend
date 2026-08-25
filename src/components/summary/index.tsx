import { useMutation, useQuery } from '@tanstack/react-query'
import { CheckCircle2, Loader2, LogOut, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { AccountHeader } from '@/components/account-header'
import { PendingGoals } from '@/components/pending-goals'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { InOrbitIcon } from '@/components/ui/in-orbit-icon'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth'
import { logout } from '@/http/auth/logout'
import { getSummary } from '@/http/summary/get-summary'
import dayjs from '@/lib/dayjs'

export const Summary = () => {
	const { user, logoutInMemory } = useAuth()

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			toast.success('Saiu com sucesso')
			logoutMutation.reset()

			logoutInMemory()
		},
		onError: () => {
			toast.error('Erro ao sair')
		},
	})

	const { data: summary } = useQuery({
		queryKey: ['get-summary'],
		queryFn: getSummary,
		staleTime: 1000 * 60, // 60 seconds
	})

	if (!summary || !user) return null

	const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
	const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

	const completedPercentage = Math.round(
		(summary.completed * 100) / summary.total
	)

	return (
		<div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10">
			{user.isDemo && <AccountHeader user={user} />}
			<div className="flex items-end justify-between">
				<div className="flex items-center gap-6">
					<InOrbitIcon />
					<span className="font-semibold text-lg capitalize">
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
				</div>
				<div className="flex flex-col items-end justify-end gap-2 md:flex-row">
					<Button
						variant="secondary"
						size="sm"
						data-tooltip-id="tooltip"
						data-tooltip-content="Sair"
						disabled={logoutMutation.isPending || logoutMutation.isSuccess}
						onClick={() => logoutMutation.mutate()}
						className="block md:hidden"
					>
						{logoutMutation.isPending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<LogOut className="size-4" />
						)}
					</Button>
					<DialogTrigger asChild>
						<Button
							className="truncate"
							size="sm"
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
						data-tooltip-id="tooltip"
						data-tooltip-content="Sair"
						disabled={logoutMutation.isPending || logoutMutation.isSuccess}
						onClick={() => logoutMutation.mutate()}
						className="hidden md:block"
					>
						{logoutMutation.isPending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<LogOut className="size-4" />
						)}
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
