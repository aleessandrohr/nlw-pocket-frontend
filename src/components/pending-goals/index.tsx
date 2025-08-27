import { OutlineButton } from "@/components/ui/outline-button";
import { createGoalCompletion } from "@/http/goals/create-goal-completion";
import { getPendingGoals } from "@/http/goals/get-pending-goals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export const PendingGoals = () => {
	const queryClient = useQueryClient();

	const { data: pendingGoals } = useQuery({
		queryKey: ["get-pending-goals"],
		queryFn: getPendingGoals,
	});

	const createGoalCompletionMutation = useMutation({
		mutationFn: createGoalCompletion,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-summary"],
			});
			queryClient.invalidateQueries({
				queryKey: ["get-pending-goals"],
			});
			toast.success("Meta completada com sucesso");
			createGoalCompletionMutation.reset();
		},
		onError: () => {
			toast.error("Erro ao completar meta");
		},
	});

	const handleCompleteGoal = async (goalId: string) => {
		createGoalCompletionMutation.mutate(goalId);
	};

	if (!pendingGoals) return null;

	return (
		<div className="flex gap-3 flex-wrap">
			{pendingGoals?.map(goal => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={
							goal.completionCount >= goal.desiredWeeklyFrequency ||
							createGoalCompletionMutation.isPending ||
							createGoalCompletionMutation.isSuccess
						}
						onClick={() => handleCompleteGoal(goal.id)}
					>
						<Plus className="size-4 text-zinc-600" />
						{goal.title}
					</OutlineButton>
				);
			})}
		</div>
	);
};
