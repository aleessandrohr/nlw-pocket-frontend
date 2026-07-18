import { LoaderCircle } from 'lucide-react'
import letsStart from '@/assets/lets-start-illustration.svg'
import logo from '@/assets/logo.svg'

export const Loading = () => {
	return (
		<div className="flex h-dvh flex-col items-center justify-center gap-8">
			<img src={logo} alt="in.orbit" />
			<img src={letsStart} alt="in.orbit" />
			<div className="flex w-full flex-col items-center gap-2">
				<span className="text-sm text-zinc-400">Ativando os propulsores</span>
				<LoaderCircle className="size-8 animate-spin text-pink-500" />
			</div>
		</div>
	)
}
