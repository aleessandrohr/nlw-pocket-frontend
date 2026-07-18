import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { AuthProvider } from './contexts/auth'
import { RoutesProvider } from './routes'

export const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<RoutesProvider />
			</AuthProvider>
			<Toaster
				toastOptions={{
					duration: 3000, // 3 seconds
					style: {
						background: '#18181B',
						color: '#F4F4F5',
					},
				}}
			/>
			<Tooltip id="tooltip" />
		</BrowserRouter>
	)
}
