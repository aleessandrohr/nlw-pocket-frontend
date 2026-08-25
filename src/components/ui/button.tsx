import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const button = tv({
	base: "flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2",

	variants: {
		variant: {
			primary:
				"bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500",
			secondary: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900",
		},

		size: {
			default: "h-10 px-4",
			sm: "h-9 px-3",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				className={cn(
					button({ variant, size, className }),
					props.disabled && "cursor-not-allowed opacity-50"
				)}
			/>
		);
	}
);

Button.displayName = "Button";
