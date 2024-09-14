import {
	DialogContent,
	DialogTitle,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createGoalFormSchema,
	type CreateGoalForm,
} from "@/schemas/create-goal-form";
import { createGoal } from "@/http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateGoal = ({ setOpen }: Props) => {
	const queryClient = useQueryClient();

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateGoalForm>({
			resolver: zodResolver(createGoalFormSchema),
		});

	const handleOnSubmit = async ({
		title,
		desiredWeeklyFrequency,
	}: CreateGoalForm) => {
		const response = await createGoal({
			title,
			desiredWeeklyFrequency,
		});

		if (!response.ok) {
			throw new Error("goal not created");
		}

		queryClient.invalidateQueries({
			queryKey: ["get-pending-goals"],
		});

		reset();

		setOpen(false);
	};

	return (
		<DialogContent>
			<div className="flex flex-col gap-6 h-full">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Cadastrar meta</DialogTitle>
						<DialogClose>
							<X className="size-5 text-zinc-600" />
						</DialogClose>
					</div>
					<DialogDescription>
						Adicione atividades que te fazem bem e que você quer continuar
						praticando toda semana.
					</DialogDescription>
				</div>
				<form
					className="flex flex-col justify-between flex-1 gap-2"
					onSubmit={handleSubmit(handleOnSubmit)}
				>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Qual a atividade?</Label>
							<Input
								id="title"
								autoFocus
								placeholder="Praticar exercícios, meditar, etc."
								{...register("title")}
							/>
							{formState.errors.title && (
								<p className="text-red-400 text-sm">
									{formState.errors.title.message}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Quantas vezes na semana?</Label>
							<Controller
								control={control}
								name="desiredWeeklyFrequency"
								defaultValue={1}
								render={({ field }) => (
									<RadioGroup
										onValueChange={field.onChange}
										value={String(field.value)}
									>
										{[1, 2, 3, 4, 5, 6, 7].map(value => (
											<RadioGroupItem key={value} value={String(value)}>
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													{value}x na semana
												</span>
											</RadioGroupItem>
										))}
									</RadioGroup>
								)}
							/>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<DialogClose asChild>
							<Button type="button" variant="secondary" className="flex-1">
								Fechar
							</Button>
						</DialogClose>
						<Button
							disabled={!formState.isValid}
							type="submit"
							className="flex-1"
						>
							Salvar
						</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	);
};
