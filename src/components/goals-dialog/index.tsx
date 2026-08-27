import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Archive, ArchiveRestore, ListChecks, Loader2, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useWeek } from '@/contexts/week'
import { archiveGoal } from '@/http/goals/archive-goal'
import type { ArchivedGoal } from '@/http/goals/get-archived-goals'
import { getArchivedGoals } from '@/http/goals/get-archived-goals'
import type { PendingGoal } from '@/http/goals/get-pending-goals'
import { getPendingGoals } from '@/http/goals/get-pending-goals'
import { unarchiveGoal } from '@/http/goals/unarchive-goal'
import { toAppTimeZone } from '@/lib/dayjs'
import { queryKeys } from '@/lib/query-keys'

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
						? `Arquivada em ${toAppTimeZone(archivedGoal?.archivedAt ?? '').format('D [de] MMMM [de] YYYY')}`
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

interface GoalFilterTabsProps {
	filter: GoalFilter
	variant: 'line' | 'glass'
	onFilterChange: (filter: GoalFilter) => void
}

const goalFilters = [
	{ value: 'active', label: 'Ativas', icon: ListChecks },
	{ value: 'archived', label: 'Arquivadas', icon: Archive },
] as const

// Mantém o mesmo filtro de metas nos formatos linear e liquid glass.
const GoalFilterTabs = ({
	filter,
	variant,
	onFilterChange,
}: GoalFilterTabsProps) => {
	return (
		<TabsList variant={variant} role="tablist" aria-label="Filtro de metas">
			{goalFilters.map(goalFilter => {
				const Icon = goalFilter.icon

				return (
					<TabsTrigger
						key={goalFilter.value}
						id={`goals-${variant}-${goalFilter.value}-tab`}
						variant={variant}
						active={filter === goalFilter.value}
						role="tab"
						aria-controls="goals-tab-panel"
						onClick={() => onFilterChange(goalFilter.value)}
					>
						<Icon className="size-4" aria-hidden="true" />
						{goalFilter.label}
					</TabsTrigger>
				)
			})}
		</TabsList>
	)
}

// Lista metas ativas ou arquivadas e permite alternar o estado de arquivamento.
export const GoalsDialog = ({ open }: GoalsDialogProps) => {
	const queryClient = useQueryClient()

	const { week } = useWeek()

	const [filter, setFilter] = useState<GoalFilter>('active')

	useEffect(() => {
		if (!open) return

		setFilter('active')
	}, [open])

	const activeGoalsQuery = useQuery({
		queryKey: queryKeys.pendingGoals.byWeek(week),
		queryFn: () => getPendingGoals(week),
		enabled: open && filter === 'active',
	})

	const archivedGoalsQuery = useQuery({
		queryKey: queryKeys.archivedGoals(),
		queryFn: getArchivedGoals,
		enabled: open && filter === 'archived',
	})

	const archiveMutation = useMutation({
		mutationFn: archiveGoal,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKeys.pendingGoals.all(),
				}),
				queryClient.invalidateQueries({ queryKey: queryKeys.archivedGoals() }),
				queryClient.invalidateQueries({ queryKey: queryKeys.summary.all() }),
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
				queryClient.invalidateQueries({
					queryKey: queryKeys.pendingGoals.all(),
				}),
				queryClient.invalidateQueries({ queryKey: queryKeys.archivedGoals() }),
				queryClient.invalidateQueries({ queryKey: queryKeys.summary.all() }),
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
	const sortedGoals = useMemo(
		() =>
			filter === 'active'
				? [...goals].sort((goalA, goalB) =>
						goalA.title.localeCompare(goalB.title, 'pt-BR', {
							sensitivity: 'base',
						})
					)
				: goals,
		[filter, goals]
	)

	return (
		<DialogContent>
			<div className="relative flex h-full flex-col gap-4 md:gap-6">
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

				<div className="hidden md:block">
					<GoalFilterTabs
						filter={filter}
						variant="line"
						onFilterChange={setFilter}
					/>
				</div>

				<div
					id="goals-tab-panel"
					role="tabpanel"
					aria-label={filter === 'active' ? 'Metas ativas' : 'Metas arquivadas'}
					className="scrollbar-modern min-h-0 flex-1 overflow-y-auto overflow-x-hidden pt-1 pb-2"
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
					{!isLoading && !isError && sortedGoals.length > 0 && (
						<ul className="flex flex-col gap-3">
							{sortedGoals.map(goal => (
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
				<nav
					className="sticky bottom-0 z-10 flex shrink-0 justify-center px-2 pt-1 pb-1 md:hidden"
					aria-label="Filtro de metas"
				>
					<GoalFilterTabs
						filter={filter}
						variant="glass"
						onFilterChange={setFilter}
					/>
				</nav>
			</div>
		</DialogContent>
	)
}
