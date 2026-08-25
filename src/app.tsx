import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { AuthProvider } from './contexts/auth'
import { WeekProvider } from './contexts/week'
import { RoutesProvider } from './routes'

export const App = () => {
	return (
		<BrowserRouter>
			<WeekProvider>
				<AuthProvider>
					<RoutesProvider />
				</AuthProvider>
			</WeekProvider>
			<Toaster
				toastOptions={{
					duration: 3000, // 3 seconds
					style: {
						background: '#18181B',
						color: '#F4F4F5',
					},
				}}
			/>
			<Tooltip id="tooltip" positionStrategy="fixed" className="!z-[100]" />
		</BrowserRouter>
	)
}
