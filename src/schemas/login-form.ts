import { REGEX } from "@/config";
import z from "zod";

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Email inválido" }),
	password: z.string().regex(REGEX.password, {
		message: "Senha inválida",
	}),
});

export type LoginForm = z.infer<typeof loginFormSchema>;
