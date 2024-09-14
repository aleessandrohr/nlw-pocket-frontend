import z from "zod";

export type CreateGoalForm = z.infer<typeof createGoalFormSchema>;

export const createGoalFormSchema = z.object({
	title: z.string().min(1, "Informe a atividade que deseja realizar"),
	desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});
