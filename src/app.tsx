import { Dialog } from "@/components/ui/dialog";
import { CreateGoal } from "@/components/CreateGoal";
import { EmptyGoals } from "@/components/EmptyGoals";
import { Summary } from "@/components/Summary";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/http/get-summary";
import { useState } from "react";

export const App = () => {
	const [open, setOpen] = useState(false);

	const { data: summary } = useQuery({
		queryKey: ["get-summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60, // 60 seconds
	});

	return (
		<Dialog open={open} defaultOpen={false} onOpenChange={setOpen}>
			{summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}
			<CreateGoal setOpen={setOpen} />
		</Dialog>
	);
};
