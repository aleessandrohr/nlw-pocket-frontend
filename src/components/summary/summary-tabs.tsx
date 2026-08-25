import { CalendarDays, ListChecks } from 'lucide-react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'

export type SummaryView = 'goals' | 'week'

interface SummaryTabsProps {
	view: SummaryView
	variant: 'line' | 'glass'
	onViewChange: (view: SummaryView) => void
}

const summaryTabs = [
	{
		value: 'goals',
		label: 'Metas',
		icon: ListChecks,
	},
	{
		value: 'week',
		label: 'Semana',
		icon: CalendarDays,
	},
] as const

// Reutiliza a mesma navegação entre metas e histórico nos layouts desktop e mobile.
export const SummaryTabs = ({
	view,
	variant,
	onViewChange,
}: SummaryTabsProps) => {
	return (
		<TabsList
			variant={variant}
			role="tablist"
			aria-label="Visualização do resumo"
		>
			{summaryTabs.map(tab => {
				const Icon = tab.icon

				return (
					<TabsTrigger
						key={tab.value}
						id={`summary-${variant}-${tab.value}-tab`}
						variant={variant}
						active={view === tab.value}
						role="tab"
						aria-controls="summary-tab-panel"
						onClick={() => onViewChange(tab.value)}
					>
						<Icon className="size-4" aria-hidden="true" />
						{tab.label}
					</TabsTrigger>
				)
			})}
		</TabsList>
	)
}
