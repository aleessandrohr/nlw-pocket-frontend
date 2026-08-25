import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'

interface SummaryProgressProps {
	completed: number
	total: number
}

// Exibe o progresso da semana sem produzir percentuais inválidos quando não há metas.
export const SummaryProgress = ({ completed, total }: SummaryProgressProps) => {
	const percentage = total > 0 ? Math.round((completed * 100) / total) : 0

	return (
		<div className="flex flex-col gap-3">
			<Progress value={completed} max={total}>
				<ProgressIndicator style={{ width: `${percentage}%` }} />
			</Progress>
			<div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
				<span>
					Você completou <span className="text-zinc-100">{completed}</span> de{' '}
					<span className="text-zinc-100">{total}</span> metas nessa semana.
				</span>
				<span className="shrink-0 tabular-nums">{percentage}%</span>
			</div>
		</div>
	)
}
