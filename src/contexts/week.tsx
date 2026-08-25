import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

interface WeekContextValue {
	week: number
	setWeek: (week: number) => void
	goToPreviousWeek: () => void
	goToNextWeek: () => void
	isCurrentWeek: boolean
}

const WeekContext = createContext<WeekContextValue | null>(null)

interface WeekProviderProps {
	children: ReactNode
}

// Mantém a semana selecionada e impede que a interface navegue para o futuro.
export const WeekProvider = ({ children }: WeekProviderProps) => {
	const [week, setWeekState] = useState(0)

	const setWeek = useCallback((nextWeek: number) => {
		if (!Number.isInteger(nextWeek) || nextWeek > 0) return

		setWeekState(nextWeek)
	}, [])

	const goToPreviousWeek = useCallback(() => {
		setWeekState(currentWeek => currentWeek - 1)
	}, [])

	const goToNextWeek = useCallback(() => {
		setWeekState(currentWeek => Math.min(0, currentWeek + 1))
	}, [])

	const value = useMemo(
		() => ({
			week,
			setWeek,
			goToPreviousWeek,
			goToNextWeek,
			isCurrentWeek: week === 0,
		}),
		[goToNextWeek, goToPreviousWeek, setWeek, week]
	)

	return <WeekContext.Provider value={value}>{children}</WeekContext.Provider>
}

export const useWeek = () => {
	const context = useContext(WeekContext)

	if (!context) {
		throw new Error('useWeek must be used within WeekProvider')
	}

	return context
}
