import { Tooltip } from 'react-tooltip'

// Centraliza o visual das dicas exibidas pelas ações compactas da interface.
export const AppTooltip = () => {
	return (
		<Tooltip
			id="tooltip"
			className="!z-[100] !max-w-40 !rounded-lg !border !border-white/10 !bg-zinc-900/90 !px-1 !py-0.5 !text-center !font-normal !text-[11px] !text-zinc-200 !leading-4 !shadow-md !shadow-black/25 !backdrop-blur-md"
			positionStrategy="fixed"
			delayShow={120}
			noArrow
			opacity={1}
		/>
	)
}
