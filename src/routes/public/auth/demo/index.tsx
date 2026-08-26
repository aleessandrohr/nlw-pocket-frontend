import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { refreshCsrfToken } from '@/http/auth/csrf-token/refresh'
import { createDemoSession } from '@/http/auth/demo/post'

// Inicia a sessão demo, obtém o CSRF e encaminha o visitante para o resumo.
export const DemoRoute = () => {
	const { user, loginInMemory, logoutInMemory } = useAuth()
	const navigate = useNavigate()
	const hasStarted = useRef(false)
	const [hasError, setHasError] = useState(false)
	const [retryAttempt, setRetryAttempt] = useState(0)

	// Libera uma nova tentativa e permite chamar novamente o endpoint da demo.
	const retryDemo = () => {
		hasStarted.current = false

		setHasError(false)
		setRetryAttempt(attempt => attempt + 1)
	}

	useEffect(() => {
		if (user) {
			navigate('/summary', { replace: true })

			return
		}

		if (retryAttempt > 0) hasStarted.current = false

		if (hasStarted.current) return

		hasStarted.current = true

		const startDemo = async () => {
			try {
				const csrfToken = await refreshCsrfToken()
				const demoUser = await createDemoSession()

				loginInMemory(demoUser, csrfToken, false)
				navigate('/summary', { replace: true })
			} catch (_error) {
				setHasError(true)

				toast.error('Não foi possível iniciar a demonstração!')

				logoutInMemory()
			}
		}

		startDemo()
	}, [loginInMemory, logoutInMemory, navigate, retryAttempt, user])

	if (hasError) {
		return (
			<div className="flex h-dvh flex-col items-center justify-center gap-8 px-5">
				<img src={logo} alt="in.orbit" />
				<p className="text-center text-sm text-zinc-400">
					Não foi possível iniciar a demonstração.
				</p>
				<Button type="button" onClick={retryDemo} disabled={retryAttempt > 3}>
					Tentar novamente
				</Button>
			</div>
		)
	}

	return <Loading />
}
