import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { InOrbitIcon } from "@/components/ui/in-orbit-icon";
import { Progress, ProgressIndicator } from "@/components/ui/progress-bar";
import { Separator } from "@/components/ui/separator";
import { OutlineButton } from "../ui/outline-button";

export const Summary = () => (
	<div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-6">
				<InOrbitIcon />
				<span className="text-lg font-semibold">5 a 10 de Agosto</span>
			</div>
			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" size="sm" />
					Cadastrar meta
				</Button>
			</DialogTrigger>
		</div>
		<div className="flex flex-col gap-3">
			<Progress value={8} max={15}>
				<ProgressIndicator className="w-[200px]" />
			</Progress>
			<div className="flex items-center justify-between text-zinc-400 text-xs">
				<span>
					Você completou <span className="text-zinc-100">8</span> de{" "}
					<span className="text-zinc-100">15</span> metas nessa semana.
				</span>
				<span>50%</span>
			</div>
			<Separator />
			<div className="flex gap-3 flex-wrap">
				<OutlineButton>
					<Plus className="size-4 text-zinc-600" />
					Meditar
				</OutlineButton>
				<OutlineButton>
					<Plus className="size-4 text-zinc-600" />
					Meditar
				</OutlineButton>
				<OutlineButton>
					<Plus className="size-4 text-zinc-600" />
					Meditar
				</OutlineButton>
				<OutlineButton>
					<Plus className="size-4 text-zinc-600" />
					Meditar
				</OutlineButton>
				<OutlineButton>
					<Plus className="size-4 text-zinc-600" />
					Meditar
				</OutlineButton>
			</div>
			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-medium">Sua semana</h2>
				<div className="flex flex-col gap-4">
					<h3 className="font-medium">
						Domingo{" "}
						<span className="text-zinc-400 text-xs">(10 de agosto)</span>
					</h3>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="font-medium">
						Domingo{" "}
						<span className="text-zinc-400 text-xs">(10 de agosto)</span>
					</h3>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="font-medium">
						Domingo{" "}
						<span className="text-zinc-400 text-xs">(10 de agosto)</span>
					</h3>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="font-medium">
						Domingo{" "}
						<span className="text-zinc-400 text-xs">(10 de agosto)</span>
					</h3>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-pink-500" />
							<span className="text-sm text-zind-400">
								Você completou "
								<span className="text-zinc-100">Acordar cedo</span>" às{" "}
								<span className="text-zinc-100">08:13h</span>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
);
