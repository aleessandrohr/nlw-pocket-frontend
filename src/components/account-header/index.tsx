import { useMutation } from '@tanstack/react-query'
import { Loader2, LogOut, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import type { User } from '@/contexts/auth'
import { useAuth } from '@/contexts/auth'
import { logout } from '@/http/auth/logout'
import { nowInAppTimeZone, toAppTimeZone } from '@/lib/dayjs'

interface AccountHeaderProps {
	user: User
}

const formatRemainingTime = (totalSeconds: number) => {
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	return [hours, minutes, seconds]
		.map(value => String(value).padStart(2, '0'))
		.join(':')
}

// Exibe a conta atual e atualiza em tempo real o prazo da demonstração.
export const AccountHeader = ({ user }: AccountHeaderProps) => {
	const { logoutInMemory } = useAuth()

	const [now, setNow] = useState(() => nowInAppTimeZone())
	const hasLoggedOut = useRef(false)

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			toast.success('Saiu com sucesso!')
			logoutInMemory()
		},
		onError: () => {
			toast.error('Erro ao sair!')
		},
	})

	const expiration = user.demoExpiresAt
		? toAppTimeZone(user.demoExpiresAt)
		: null
	const hasValidExpiration = expiration?.isValid() === true

	useEffect(() => {
		if (!user.isDemo || !user.demoExpiresAt) return

		const intervalId = window.setInterval(() => {
			setNow(nowInAppTimeZone())
		}, 1000)

		return () => window.clearInterval(intervalId)
	}, [user.demoExpiresAt, user.isDemo])

	const remainingSeconds =
		user.isDemo && hasValidExpiration
			? Math.max(0, expiration.diff(now, 'second'))
			: 0
	const isExpired =
		user.isDemo && (!hasValidExpiration || remainingSeconds === 0)

	useEffect(() => {
		if (!isExpired || hasLoggedOut.current) return

		hasLoggedOut.current = true

		// Tenta invalidar a sessão no backend e sempre limpa o estado local ao expirar.
		const logoutExpiredDemo = async () => {
			try {
				await logout()
			} catch {
				// O backend pode rejeitar uma sessão já expirada; o estado local ainda deve ser limpo.
			} finally {
				logoutInMemory()
			}
		}

		void logoutExpiredDemo()
	}, [isExpired, logoutInMemory])

	return (
		<header className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
			<div className="flex min-w-0 items-center gap-3">
				<Users className="size-5 shrink-0 text-zinc-400" aria-hidden="true" />
				<div className="min-w-0">
					<p className="truncate font-medium text-zinc-100">{user.name}</p>
					<p className="text-xs text-zinc-400">
						{user.isDemo ? 'Conta demonstração' : 'Conta pessoal'}
					</p>
				</div>
			</div>

			{user.isDemo ? (
				<div className="shrink-0 text-right">
					<p className="text-xs text-zinc-400">
						{isExpired ? 'Demo expirada' : 'Expira em'}
					</p>
					{!isExpired && (
						<p className="font-semibold text-pink-400 tabular-nums">
							{formatRemainingTime(remainingSeconds)}
						</p>
					)}
				</div>
			) : (
				<Button
					variant="secondary"
					size="sm"
					type="button"
					aria-label="Sair"
					data-tooltip-id="tooltip"
					data-tooltip-content="Sair"
					disabled={logoutMutation.isPending || logoutMutation.isSuccess}
					onClick={() => logoutMutation.mutate()}
				>
					{logoutMutation.isPending ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<LogOut className="size-4" />
					)}
				</Button>
			)}
		</header>
	)
}
