import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConfirmationDialogProps {
	open: boolean
	title: string
	description: string
	confirmLabel: string
	isPending?: boolean
	onConfirm: () => void
	onOpenChange: (open: boolean) => void
}

// Exibe uma confirmação modal e impede o fechamento enquanto a ação está pendente.
export const ConfirmationDialog = ({
	open,
	title,
	description,
	confirmLabel,
	isPending = false,
	onConfirm,
	onOpenChange,
}: ConfirmationDialogProps) => {
	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen && isPending) return

		onOpenChange(nextOpen)
	}

	return (
		<DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
				<DialogPrimitive.Content
					className="fixed top-1/2 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/50"
					onEscapeKeyDown={event => {
						if (isPending) event.preventDefault()
					}}
					onPointerDownOutside={event => {
						if (isPending) event.preventDefault()
					}}
				>
					<DialogPrimitive.Close asChild>
						<button
							type="button"
							aria-label="Fechar"
							disabled={isPending}
							className="absolute top-4 right-4 rounded-md p-1 text-zinc-600 outline-none transition-colors hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50"
						>
							<X className="size-5" aria-hidden="true" />
						</button>
					</DialogPrimitive.Close>

					<div className="flex flex-col items-center text-center">
						<div className="flex size-12 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400">
							<AlertTriangle className="size-6" aria-hidden="true" />
						</div>
						<div className="mt-4 flex min-w-0 flex-col gap-2">
							<DialogPrimitive.Title className="font-semibold text-lg text-zinc-100">
								{title}
							</DialogPrimitive.Title>
							<DialogPrimitive.Description className="text-sm text-zinc-400 leading-relaxed">
								{description}
							</DialogPrimitive.Description>
						</div>
					</div>

					<div className="mt-6 flex w-full gap-2">
						<DialogPrimitive.Close asChild>
							<Button
								variant="secondary"
								size="sm"
								className="flex-1"
								disabled={isPending}
							>
								Cancelar
							</Button>
						</DialogPrimitive.Close>
						<Button
							size="sm"
							className="flex-1"
							disabled={isPending}
							onClick={onConfirm}
						>
							{isPending ? 'Desmarcando...' : confirmLabel}
						</Button>
					</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}
