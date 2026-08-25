import { Tooltip } from 'react-tooltip'

// Centraliza o visual das dicas exibidas pelas ações compactas da interface.
export const AppTooltip = () => {
	return (
		<Tooltip
			id="tooltip"
			className="!z-[100] !max-w-64 !rounded-xl !border !border-white/10 !bg-zinc-900/95 !px-3 !py-2 !text-center !font-medium !text-xs !text-zinc-100 !shadow-xl !shadow-black/40 !backdrop-blur-xl"
			positionStrategy="fixed"
			delayShow={120}
			noArrow
			opacity={1}
		/>
	)
}
