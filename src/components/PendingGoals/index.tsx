import { OutlineButton } from "@/components/ui/outline-button";
import { createGoalCompletion } from "@/http/create-goal-completion";
import { getPendingGoals } from "@/http/get-pending-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export const PendingGoals = () => {
	const queryClient = useQueryClient();

	const { data: pendingGoals } = useQuery({
		queryKey: ["get-pending-goals"],
		queryFn: getPendingGoals,
	});

	if (!pendingGoals) return null;

	const handleCompleteGoal = async (goalId: string) => {
		const response = await createGoalCompletion(goalId);

		if (!response.ok) {
			throw new Error("goal completion not created");
		}

		queryClient.invalidateQueries({
			queryKey: ["get-summary"],
		});
		queryClient.invalidateQueries({
			queryKey: ["get-pending-goals"],
		});
	};

	return (
		<div className="flex gap-3 flex-wrap">
			{pendingGoals?.map(goal => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
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
