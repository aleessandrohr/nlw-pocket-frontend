import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { InOrbitIcon } from "@/components/ui/in-orbit-icon";
import { Progress, ProgressIndicator } from "@/components/ui/progress-bar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { PendingGoals } from "@/components/PendingGoals";

dayjs.locale(ptBR);

export const Summary = () => {
	const { data: summary } = useQuery({
		queryKey: ["get-summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60, // 60 seconds
	});

	if (!summary) return null;

	const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
	const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

	const completedPercentage = Math.round(
		(summary.completed * 100) / summary.total
	);

	return (
		<div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-6">
					<InOrbitIcon />
					<span className="text-lg font-semibold capitalize">
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
				</div>
				<DialogTrigger asChild>
					<Button>
						<Plus className="size-4" size="sm" />
						Cadastrar meta
					</Button>
				</DialogTrigger>
			</div>
			<div className="flex flex-col gap-3">
				<Progress value={summary.completed} max={summary.total}>
					<ProgressIndicator style={{ width: `${completedPercentage}%` }} />
				</Progress>
				<div className="flex items-center justify-between text-zinc-400 text-xs">
					<span>
						Você completou{" "}
						<span className="text-zinc-100">{summary.completed}</span> de{" "}
						<span className="text-zinc-100">{summary.total}</span> metas nessa
						semana.
					</span>
					<span>{completedPercentage}%</span>
				</div>
				<Separator />
				<PendingGoals />
				<div className="flex flex-col gap-6">
					<h2 className="text-xl font-medium">Sua semana</h2>
					{Object.entries(summary.goalsPerDay).map(([date, goals]) => {
						const weekDay = dayjs(date).format("dddd");
						const formattedDate = dayjs(date).format("D [de] MMMM");

						return (
							<div key={date} className="flex flex-col gap-4">
								<h3 className="font-medium">
									<span className="capitalize">{weekDay}</span>{" "}
									<span className="text-zinc-400 text-xs">
										({formattedDate})
									</span>
								</h3>
								<ul className="flex flex-col gap-3">
									{goals.map(goal => {
										const time = dayjs(goal.completedAt).format("HH:mm");

										return (
											<li key={goal.id} className="flex items-center gap-2">
												<CheckCircle2 className="size-4 text-pink-500" />
												<span className="text-sm text-zind-400">
													Você completou "
													<span className="text-zinc-100">{goal.title}</span>"
													às <span className="text-zinc-100">{time}</span>
												</span>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
