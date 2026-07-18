import { z } from 'zod'

import { REGEX } from '@/config'

export const createUserFormSchema = z.object({
	name: z.string().trim().min(1, { message: 'Nome é obrigatório' }).max(255, {
		message: 'Nome não pode ter mais de 255 caracteres',
	}),
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().regex(REGEX.password, { message: 'Senha inválida' }),
	confirmPassword: z.string().regex(REGEX.password, {
		message: 'Senha inválida',
	}),
})

export type CreateUserForm = z.infer<typeof createUserFormSchema>
