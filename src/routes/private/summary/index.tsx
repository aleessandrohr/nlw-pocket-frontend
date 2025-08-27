import { CreateGoal } from "@/components/create-goal";
import { EmptyGoals } from "@/components/empty-goals";
import { Summary } from "@/components/summary";
import { Dialog } from "@/components/ui/dialog";
import { getSummary } from "@/http/summary/get-summary";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const SummaryRoute = () => {
	const [open, setOpen] = useState(false);

	const { data: summary, isLoading: isLoadingSummary } = useQuery({
		queryKey: ["get-summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60, // 60 seconds
	});

	if (isLoadingSummary) return null;

	return (
		<Dialog open={open} defaultOpen={false} onOpenChange={setOpen}>
			{summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}
			<CreateGoal setOpen={setOpen} />
		</Dialog>
	);
};
