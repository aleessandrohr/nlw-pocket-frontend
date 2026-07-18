import z from 'zod'
import { REGEX } from '@/config'

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().regex(REGEX.password, {
		message: 'Senha inválida',
	}),
})

export type LoginForm = z.infer<typeof loginFormSchema>
