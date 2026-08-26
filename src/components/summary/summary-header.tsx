import {
	CalendarDays,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Plus,
} from 'lucide-react'
import { AccountHeader } from '@/components/account-header'
import { Button } from '@/components/ui/button'
import { InOrbitIcon } from '@/components/ui/in-orbit-icon'
import type { User } from '@/contexts/auth'
import { useWeek } from '@/contexts/week'
import type { WeekSummary } from '@/http/summary/get-summary'
import { nowInAppTimeZone } from '@/lib/dayjs'
import { SummaryProgress } from './summary-progress'
import { SummaryTabs, type SummaryView } from './summary-tabs'

interface SummaryHeaderProps {
	user: User
	summary: WeekSummary
	view: SummaryView
	onViewChange: (view: SummaryView) => void
	onOpenCreateGoal: () => void
	onOpenGoals: () => void
}

// Reúne as ações persistentes do resumo sem misturar o conteúdo rolável das tabs.
export const SummaryHeader = ({
	user,
	summary,
	view,
	onViewChange,
	onOpenCreateGoal,
	onOpenGoals,
}: SummaryHeaderProps) => {
	const { goToNextWeek, goToPreviousWeek, isCurrentWeek, setWeek, week } =
		useWeek()

	const startOfWeek = nowInAppTimeZone().startOf('day').day(0).add(week, 'week')
	const endOfWeek = startOfWeek.add(6, 'day')
	// Evita repetir o mês na mesma semana e mantém os dois meses quando necessário.
	const weekLabel =
		startOfWeek.month() === endOfWeek.month()
			? `${startOfWeek.format('D')} - ${endOfWeek.format('D MMMM')}`
			: `${startOfWeek.format('D MMMM')} - ${endOfWeek.format('D MMMM')}`

	return (
		<header className="sticky top-0 z-10 flex shrink-0 flex-col gap-6 bg-zinc-950 pb-4">
			<AccountHeader user={user} />
			<div className="flex flex-col gap-3">
				<div className="flex min-w-0 items-center gap-2">
					<InOrbitIcon />
					<div className="ml-auto flex min-w-0 items-center gap-2">
						<Button
							className="min-w-0 flex-1 truncate md:flex-none"
							size="sm"
							type="button"
							onClick={onOpenCreateGoal}
						>
							<Plus className="size-4" aria-hidden="true" />
							Cadastrar meta
						</Button>
						{/* Mantém o retorno ao período atual ao lado do cadastro, sem texto extra. */}
						{!isCurrentWeek && (
							<Button
								variant="secondary"
								size="sm"
								type="button"
								className="size-9 shrink-0 p-0"
								aria-label="Voltar para a semana atual"
								title="Voltar para a semana atual"
								onClick={() => setWeek(0)}
								data-tooltip-id="tooltip"
								data-tooltip-content="Voltar para a semana atual"
							>
								<CalendarDays className="size-4" aria-hidden="true" />
							</Button>
						)}
						<Button
							variant="secondary"
							size="sm"
							type="button"
							className="size-9 shrink-0 p-0"
							aria-label="Mais opções de meta"
							onClick={onOpenGoals}
							data-tooltip-id="tooltip"
							data-tooltip-content="Mais opções de meta"
						>
							<MoreHorizontal className="size-4" aria-hidden="true" />
						</Button>
					</div>
				</div>
				<div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/30 px-2 py-2">
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
						<ChevronLeft className="size-4" aria-hidden="true" />
					</Button>
					<span className="min-w-0 flex-1 truncate whitespace-nowrap text-center font-semibold text-sm capitalize sm:text-lg">
						{weekLabel}
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
						<ChevronRight className="size-4" aria-hidden="true" />
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<SummaryProgress completed={summary.completed} total={summary.total} />
				<div className="my-2 hidden md:block">
					<SummaryTabs view={view} variant="line" onViewChange={onViewChange} />
				</div>
			</div>
		</header>
	)
}
