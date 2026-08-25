import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

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

// Converte o parâmetro da URL somente após validar o formato e o limite da semana.
const parseWeekParam = (value: string | null) => {
	if (!value || !/^-?\d+$/.test(value)) return 0

	const parsedWeek = Number(value)

	return Number.isSafeInteger(parsedWeek) && parsedWeek <= 0 ? parsedWeek : 0
}

// Mantém a semana selecionada e impede que a interface navegue para o futuro.
export const WeekProvider = ({ children }: WeekProviderProps) => {
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const [week, setWeekState] = useState(() =>
		parseWeekParam(searchParams.get('week'))
	)

	useEffect(() => {
		if (location.pathname !== '/summary') return

		setWeekState(parseWeekParam(searchParams.get('week')))
	}, [location.pathname, searchParams])

	const setWeek = useCallback(
		(nextWeek: number) => {
			if (!Number.isInteger(nextWeek) || nextWeek > 0) return

			setWeekState(nextWeek)

			if (location.pathname !== '/summary') return

			setSearchParams(
				previousParams => {
					const nextParams = new URLSearchParams(previousParams)
					nextParams.set('week', String(nextWeek))

					return nextParams
				},
				{ replace: true }
			)
		},
		[location.pathname, setSearchParams]
	)

	const goToPreviousWeek = useCallback(() => {
		setWeek(week - 1)
	}, [setWeek, week])

	const goToNextWeek = useCallback(() => {
		setWeek(Math.min(0, week + 1))
	}, [setWeek, week])

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
