import { type ComponentProps, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const tabsList = tv({
	base: 'flex items-center',
	variants: {
		variant: {
			line: 'border-b border-zinc-800',
			glass:
				'w-fit gap-1.5 rounded-full border border-white/10 bg-zinc-900/50 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl',
		},
	},
	defaultVariants: {
		variant: 'line',
	},
})

const tabsTrigger = tv({
	base: 'inline-flex items-center justify-center gap-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-500/70 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		variant: {
			line: 'border-b-2 px-3 py-3',
			glass: 'min-h-11 rounded-full px-4 py-2.5 text-sm',
		},
		active: {
			true: '',
			false: '',
		},
	},
	compoundVariants: [
		{
			variant: 'line',
			active: true,
			class: 'border-violet-500 text-zinc-100',
		},
		{
			variant: 'line',
			active: false,
			class:
				'border-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-200',
		},
		{
			variant: 'glass',
			active: true,
			class: 'bg-violet-500/20 text-violet-100 shadow-inner shadow-violet-500/10',
		},
		{
			variant: 'glass',
			active: false,
			class: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100',
		},
	],
	defaultVariants: {
		variant: 'line',
		active: false,
	},
})

interface TabsListProps
	extends ComponentProps<'div'>,
		VariantProps<typeof tabsList> {}

interface TabsTriggerProps
	extends ComponentProps<'button'>,
		VariantProps<typeof tabsTrigger> {
	active: boolean
}

// Mantém estilos e estados de tabs consistentes entre painéis lineares e glass.
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
	({ className, variant, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(tabsList({ variant }), className)}
			{...props}
		/>
	)
)

TabsList.displayName = 'TabsList'

// Expõe um botão de tab acessível com o estado visual centralizado.
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
	({ active, className, variant, ...props }, ref) => (
		<button
			ref={ref}
			type="button"
			aria-selected={active}
			data-state={active ? 'active' : 'inactive'}
			className={cn(tabsTrigger({ variant, active }), className)}
			{...props}
		/>
	)
)

TabsTrigger.displayName = 'TabsTrigger'
