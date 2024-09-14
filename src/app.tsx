import { Dialog } from "@/components/ui/dialog";
import { CreateGoal } from "@/components/CreateGoal";
import { EmptyGoals } from "@/components/EmptyGoals";
import { Summary } from "@/components/Summary";

export const App = () => {
	return (
		<Dialog>
			<Summary />
			{/* <EmptyGoals /> */}
			<CreateGoal />
		</Dialog>
	);
};
