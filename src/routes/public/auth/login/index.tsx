import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth'
import { refreshCsrfToken } from '@/http/auth/csrf-token/refresh'
import { login } from '@/http/auth/login/post'
import { type LoginForm, loginFormSchema } from '@/schemas/login-form'

export const LoginRoute = () => {
	const { loginInMemory, logoutInMemory } = useAuth()

	const form = useForm<LoginForm>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginFormSchema),
	})

	const loginMutation = useMutation({
		mutationFn: async (data: LoginForm) => {
			const csrfToken = await refreshCsrfToken()
			const user = await login(data)

			return { csrfToken, user }
		},
		onSuccess: ({ csrfToken, user }) => {
			toast.success('Entrou com sucesso!')

			loginInMemory(user, csrfToken)
		},
		onError: () => {
			toast.error('Email ou senha inválidos!')

			logoutInMemory()
		},
	})

	const handleOnSubmit = (data: LoginForm) => {
		loginMutation.mutate(data)
	}

	return (
		<div className="flex h-dvh flex-col items-center justify-center gap-8 px-5">
			<img src={logo} alt="in.orbit" />
			<form
				onSubmit={form.handleSubmit(handleOnSubmit)}
				className="flex w-full max-w-sm flex-col items-center justify-center gap-4"
			>
				<div className="flex w-full flex-col gap-2">
					<Input placeholder="Email" {...form.register('email')} />
					{form.formState.errors.email && (
						<p className="text-red-400 text-sm">
							{form.formState.errors.email.message}
						</p>
					)}
				</div>
				<div className="flex w-full flex-col gap-2">
					<Input
						type="password"
						placeholder="Senha"
						{...form.register('password')}
					/>
					{form.formState.errors.password && (
						<p className="text-red-400 text-sm">
							{form.formState.errors.password.message}
						</p>
					)}
				</div>
				<Button
					type="submit"
					className="w-full self-start"
					disabled={loginMutation.isPending || loginMutation.isSuccess}
				>
					{loginMutation.isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Entrando...
						</>
					) : (
						'Entrar'
					)}
				</Button>
				<div className="flex items-center gap-1">
					<p className="text-sm text-zinc-400">Não tem uma conta?</p>
					<Link to="/auth/create-user" className="text-sm text-zinc-100">
						Cadastre-se
					</Link>
				</div>
			</form>
		</div>
	)
}
