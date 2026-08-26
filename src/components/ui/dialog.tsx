import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
} from "react";

export const Dialog = (props: DialogPrimitive.DialogProps) => {
	return <DialogPrimitive.Dialog {...props} />;
};

export const DialogTrigger = forwardRef<
	ElementRef<typeof DialogPrimitive.DialogTrigger>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTrigger>
>((props, ref) => {
	return <DialogPrimitive.DialogTrigger ref={ref} {...props} />;
});

export const DialogClose = forwardRef<
	ElementRef<typeof DialogPrimitive.DialogClose>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.DialogClose>
>((props, ref) => {
	return <DialogPrimitive.DialogClose ref={ref} {...props} />;
});

export const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => {
	return <DialogPrimitive.DialogPortal {...props} />;
};

export const DialogOverlay = forwardRef<
	ElementRef<typeof DialogPrimitive.DialogOverlay>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.DialogOverlay>
>((props, ref) => {
	return (
		<DialogPrimitive.DialogOverlay
			ref={ref}
			{...props}
			className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
		/>
	);
});

export const DialogContent = forwardRef<
	ElementRef<typeof DialogPrimitive.DialogContent>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.DialogContent>
>((props, ref) => {
	return (
		<DialogPortal>
			<DialogOverlay />

			<DialogPrimitive.DialogContent
				ref={ref}
				{...props}
				className="fixed z-[60] right-0 top-0 bottom-0 max-w-[400px] w-full h-dvh border-l border-zinc-900 bg-zinc-950 p-8"
			/>
		</DialogPortal>
	);
});

export const DialogTitle = forwardRef<
	ElementRef<typeof DialogPrimitive.DialogTitle>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTitle>
>((props, ref) => {
	return (
		<DialogPrimitive.DialogTitle
			ref={ref}
			{...props}
			className="text-lg font-semibold"
		/>
	);
});

export const DialogDescription = forwardRef<
	ElementRef<typeof DialogPrimitive.DialogDescription>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.DialogDescription>
>((props, ref) => {
	return (
		<DialogPrimitive.DialogDescription
			ref={ref}
			{...props}
			className="text-zinc-400 text-sm leading-relaxed"
		/>
	);
});
