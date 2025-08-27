import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from "@/components/ui/radio-group";
import { createGoal } from "@/http/goals/create-goal";
import {
	type CreateGoalForm,
	createGoalFormSchema,
} from "@/schemas/create-goal-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface Props {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateGoal = ({ setOpen }: Props) => {
	const queryClient = useQueryClient();

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateGoalForm>({
			resolver: zodResolver(createGoalFormSchema),
		});

	const createGoalMutation = useMutation({
		mutationFn: createGoal,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-pending-goals"],
			});
			queryClient.invalidateQueries({
				queryKey: ["get-summary"],
			});
			toast.success("Meta cadastrada com sucesso");
			createGoalMutation.reset();

			reset();

			setOpen(false);
		},
		onError: () => {
			toast.error("Erro ao cadastrar meta");
		},
	});

	const handleOnSubmit = async ({
		title,
		desiredWeeklyFrequency,
	}: CreateGoalForm) => {
		createGoalMutation.mutate({
			title,
			desiredWeeklyFrequency,
		});
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
					className="flex flex-col justify-between flex-1 gap-2 overflow-y-auto"
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
					<div className="flex items-center gap-3 sticky bottom-0 z-10 bg-zinc-950">
						<DialogClose asChild>
							<Button type="button" variant="secondary" className="flex-1">
								Fechar
							</Button>
						</DialogClose>
						<Button
							disabled={
								!formState.isValid ||
								createGoalMutation.isPending ||
								createGoalMutation.isSuccess
							}
							type="submit"
							className="flex-1"
						>
							{createGoalMutation.isPending ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Salvando...
								</>
							) : (
								"Salvar"
							)}
						</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	);
};
