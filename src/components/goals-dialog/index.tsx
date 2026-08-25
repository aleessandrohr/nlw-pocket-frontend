import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Archive, ArchiveRestore, ListChecks, Loader2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog'
import { archiveGoal } from '@/http/goals/archive-goal'
import type { ArchivedGoal } from '@/http/goals/get-archived-goals'
import { getArchivedGoals } from '@/http/goals/get-archived-goals'
import type { PendingGoal } from '@/http/goals/get-pending-goals'
import { getPendingGoals } from '@/http/goals/get-pending-goals'
import { unarchiveGoal } from '@/http/goals/unarchive-goal'
import dayjs from '@/lib/dayjs'

type GoalFilter = 'active' | 'archived'

interface GoalItemProps {
	goal: PendingGoal | ArchivedGoal
	filter: GoalFilter
	isPending: boolean
	onArchive: (goalId: string) => void
	onUnarchive: (goalId: string) => void
}

// Renderiza uma meta com a ação correspondente ao filtro selecionado.
const GoalItem = ({
	goal,
	filter,
	isPending,
	onArchive,
	onUnarchive,
}: GoalItemProps) => {
	const isArchived = filter === 'archived'
	const archivedGoal = isArchived ? (goal as ArchivedGoal) : null

	return (
		<li className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-3">
			<div className="min-w-0">
				<p className="truncate font-medium text-sm text-zinc-100">
					{goal.title}
				</p>
				<p className="text-xs text-zinc-500">
					{isArchived
						? `Arquivada em ${dayjs(archivedGoal?.archivedAt).format('D [de] MMMM [de] YYYY')}`
						: `${goal.completionCount}/${goal.desiredWeeklyFrequency} conclusões nesta semana`}
				</p>
			</div>
			<Button
				variant="secondary"
				size="sm"
				type="button"
				aria-label={
					isArchived ? `Desarquivar ${goal.title}` : `Arquivar ${goal.title}`
				}
				title={isArchived ? 'Desarquivar meta' : 'Arquivar meta'}
				data-tooltip-id="tooltip"
				data-tooltip-content={isArchived ? 'Desarquivar meta' : 'Arquivar meta'}
				data-tooltip-place="top"
				disabled={isPending}
				onClick={() => (isArchived ? onUnarchive(goal.id) : onArchive(goal.id))}
			>
				{isPending ? (
					<Loader2 className="size-4 animate-spin" />
				) : isArchived ? (
					<ArchiveRestore className="size-4" />
				) : (
					<Archive className="size-4" />
				)}
			</Button>
		</li>
	)
}

interface GoalsDialogProps {
	open: boolean
}

// Lista metas ativas ou arquivadas e permite alternar o estado de arquivamento.
export const GoalsDialog = ({ open }: GoalsDialogProps) => {
	const queryClient = useQueryClient()

	const [filter, setFilter] = useState<GoalFilter>('active')

	useEffect(() => {
		if (!open) return

		setFilter('active')
	}, [open])

	const activeGoalsQuery = useQuery({
		queryKey: ['get-pending-goals'],
		queryFn: getPendingGoals,
		enabled: open && filter === 'active',
	})

	const archivedGoalsQuery = useQuery({
		queryKey: ['get-archived-goals'],
		queryFn: getArchivedGoals,
		enabled: open && filter === 'archived',
	})

	const archiveMutation = useMutation({
		mutationFn: archiveGoal,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['get-pending-goals'] }),
				queryClient.invalidateQueries({ queryKey: ['get-archived-goals'] }),
				queryClient.invalidateQueries({ queryKey: ['get-summary'] }),
			])

			toast.success('Meta arquivada com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao arquivar meta!')
		},
	})

	const unarchiveMutation = useMutation({
		mutationFn: unarchiveGoal,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['get-pending-goals'] }),
				queryClient.invalidateQueries({ queryKey: ['get-archived-goals'] }),
				queryClient.invalidateQueries({ queryKey: ['get-summary'] }),
			])

			toast.success('Meta desarquivada com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao desarquivar meta!')
		},
	})

	const goals =
		filter === 'active'
			? (activeGoalsQuery.data ?? [])
			: (archivedGoalsQuery.data ?? [])
	const isLoading =
		filter === 'active'
			? activeGoalsQuery.isLoading
			: archivedGoalsQuery.isLoading
	const isError =
		filter === 'active' ? activeGoalsQuery.isError : archivedGoalsQuery.isError

	return (
		<DialogContent>
			<div className="flex h-full flex-col gap-6">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Minhas metas</DialogTitle>
						<DialogClose>
							<X className="size-5 text-zinc-600" />
						</DialogClose>
					</div>
					<DialogDescription>
						Consulte suas metas e arquive as atividades que você não deseja mais
						acompanhar na lista principal.
					</DialogDescription>
				</div>

				<div
					className="flex border-zinc-800 border-b"
					role="tablist"
					aria-label="Filtro de metas"
				>
					<button
						id="active-goals-tab"
						type="button"
						role="tab"
						aria-selected={filter === 'active'}
						aria-controls="goals-tab-panel"
						tabIndex={filter === 'active' ? 0 : -1}
						onClick={() => setFilter('active')}
						className={`flex items-center gap-2 border-b-2 px-3 pb-3 text-sm transition-colors ${
							filter === 'active'
								? 'border-violet-500 text-zinc-100'
								: 'border-transparent text-zinc-500 hover:text-zinc-300'
						}`}
					>
						<ListChecks className="size-4" />
						Ativas
					</button>
					<button
						id="archived-goals-tab"
						type="button"
						role="tab"
						aria-selected={filter === 'archived'}
						aria-controls="goals-tab-panel"
						tabIndex={filter === 'archived' ? 0 : -1}
						onClick={() => setFilter('archived')}
						className={`flex items-center gap-2 border-b-2 px-3 pb-3 text-sm transition-colors ${
							filter === 'archived'
								? 'border-violet-500 text-zinc-100'
								: 'border-transparent text-zinc-500 hover:text-zinc-300'
						}`}
					>
						<Archive className="size-4" />
						Arquivadas
					</button>
				</div>

				<div
					id="goals-tab-panel"
					role="tabpanel"
					aria-labelledby={
						filter === 'active' ? 'active-goals-tab' : 'archived-goals-tab'
					}
					className="scrollbar-modern min-h-0 flex-1 overflow-y-auto overflow-x-hidden pt-2 pb-2"
				>
					{isLoading && (
						<div className="flex h-full items-center justify-center text-zinc-500">
							<Loader2 className="size-5 animate-spin" />
						</div>
					)}
					{isError && (
						<p className="text-center text-red-400 text-sm">
							Não foi possível carregar suas metas.
						</p>
					)}
					{!isLoading && !isError && goals.length === 0 && (
						<p className="text-center text-sm text-zinc-500">
							{filter === 'active'
								? 'Nenhuma meta ativa encontrada.'
								: 'Nenhuma meta arquivada encontrada.'}
						</p>
					)}
					{!isLoading && !isError && goals.length > 0 && (
						<ul className="flex flex-col gap-3">
							{goals.map(goal => (
								<GoalItem
									key={goal.id}
									goal={goal}
									filter={filter}
									isPending={
										(archiveMutation.isPending &&
											archiveMutation.variables === goal.id) ||
										(unarchiveMutation.isPending &&
											unarchiveMutation.variables === goal.id)
									}
									onArchive={goalId => archiveMutation.mutate(goalId)}
									onUnarchive={goalId => unarchiveMutation.mutate(goalId)}
								/>
							))}
						</ul>
					)}
				</div>
			</div>
		</DialogContent>
	)
}
