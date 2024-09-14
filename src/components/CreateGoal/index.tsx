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

export const CreateGoal = () => (
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
			<form className="flex flex-col justify-between flex-1 gap-2">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Qual a atividade?</Label>
						<Input
							id="title"
							autoFocus
							placeholder="Praticar exercícios, meditar, etc."
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Quantas vezes na semana?</Label>
						<RadioGroup>
							{[1, 2, 3, 4, 5, 6, 7].map(value => (
								<RadioGroupItem key={value} value={String(value)}>
									<RadioGroupIndicator />
									<span className="text-zinc-300 text-sm font-medium leading-none">
										{value}x na semana
									</span>
								</RadioGroupItem>
							))}
						</RadioGroup>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<DialogClose asChild>
						<Button type="button" variant="secondary" className="flex-1">
							Fechar
						</Button>
					</DialogClose>
					<Button className="flex-1">Salvar</Button>
				</div>
			</form>
		</div>
	</DialogContent>
);
