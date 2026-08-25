import { Archive, CheckCircle2, Loader2, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWeek } from '@/contexts/week'
import type { WeekCompletion, WeekSummary } from '@/http/summary/get-summary'
import { nowInAppTimeZone, toAppCivilDate, toAppTimeZone } from '@/lib/dayjs'

interface SummaryWeekHistoryProps {
	goalsPerDay: WeekSummary['goalsPerDay']
	isUndoPending: boolean
	undoingCompletionId?: string
	onUndo: (completion: WeekCompletion) => void
}

interface CompletionHistoryItemProps {
	completion: WeekCompletion
	canUndo: boolean
	isUndoPending: boolean
	isUndoing: boolean
	onUndo: (completion: WeekCompletion) => void
}

// Mostra uma conclusão e preserva espaço para a ação, mesmo quando ela não está disponível.
const CompletionHistoryItem = ({
	completion,
	canUndo,
	isUndoPending,
	isUndoing,
	onUndo,
}: CompletionHistoryItemProps) => {
	const time = toAppTimeZone(completion.completedAt).format('HH:mm')

	return (
		<li className="flex min-h-8 items-center justify-between gap-3">
			<div className="flex min-w-0 items-center gap-2">
				<CheckCircle2
					className="size-4 shrink-0 text-pink-500"
					aria-hidden="true"
				/>
				<span className="text-sm text-zinc-400">
					Você completou "
					<span className="text-zinc-100">{completion.title}</span>" às{' '}
					<span className="text-zinc-100">{time}</span>
				</span>
			</div>
			<div className="flex size-8 shrink-0 items-center justify-center">
				{completion.isArchived ? (
					<span
						role="img"
						aria-label="Meta arquivada"
						data-tooltip-id="tooltip"
						data-tooltip-content="Meta arquivada"
						className="flex size-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500"
					>
						<Archive className="size-4" aria-hidden="true" />
					</span>
				) : canUndo ? (
					<Button
						variant="secondary"
						size="sm"
						type="button"
						className="size-8 p-0"
						aria-label={`Desmarcar conclusão de ${completion.title}`}
						data-tooltip-id="tooltip"
						data-tooltip-content="Desmarcar conclusão"
						disabled={isUndoPending}
						onClick={() => onUndo(completion)}
					>
						{isUndoing ? (
							<Loader2 className="size-4 animate-spin" aria-hidden="true" />
						) : (
							<Undo2 className="size-4" aria-hidden="true" />
						)}
					</Button>
				) : null}
			</div>
		</li>
	)
}

// Agrupa o histórico por data civil e libera desmarcação apenas no dia atual.
export const SummaryWeekHistory = ({
	goalsPerDay,
	isUndoPending,
	undoingCompletionId,
	onUndo,
}: SummaryWeekHistoryProps) => {
	const { isCurrentWeek } = useWeek()
	const now = nowInAppTimeZone()

	if (!goalsPerDay) {
		return (
			<p className="text-sm text-zinc-500">
				Nenhuma conclusão registrada nesta semana.
			</p>
		)
	}

	return (
		<div className="flex flex-col gap-6">
			<h2 className="font-medium text-xl">Sua semana</h2>
			{Object.entries(goalsPerDay).map(([date, completions]) => {
				const civilDate = toAppCivilDate(date)

				return (
					<div key={date} className="flex flex-col gap-4">
						<h3 className="font-medium">
							<span className="capitalize">{civilDate.format('dddd')}</span>{' '}
							<span className="text-xs text-zinc-400">
								({civilDate.format('D [de] MMMM')})
							</span>
						</h3>
						<ul className="flex flex-col gap-3">
							{completions.map(completion => {
								const canUndo =
									isCurrentWeek &&
									!completion.isArchived &&
									toAppTimeZone(completion.completedAt).isSame(now, 'day')

								return (
									<CompletionHistoryItem
										key={completion.id}
										completion={completion}
										canUndo={canUndo}
										isUndoPending={isUndoPending}
										isUndoing={undoingCompletionId === completion.id}
										onUndo={onUndo}
									/>
								)
							})}
						</ul>
					</div>
				)
			})}
		</div>
	)
}
