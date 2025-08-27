import logo from "@/assets/logo.svg";
import { PasswordStrengthChecklist } from "@/components/password-strength-check-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { getCsrfToken } from "@/http/auth/csrf-token/get";
import { login } from "@/http/auth/login/post";
import { type LoginForm, loginFormSchema } from "@/schemas/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const LoginRoute = () => {
	const { loginInMemory, logoutInMemory } = useAuth();

	const form = useForm<LoginForm>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginFormSchema),
	});

	const password = form.watch("password");

	const loginMutation = useMutation({
		mutationFn: (data: LoginForm) => login(data),
		onSuccess: async user => {
			toast.success("Entrou com sucesso");

			const { csrfToken } = await getCsrfToken();

			loginInMemory(user, csrfToken);
		},
		onError: () => {
			toast.error("Email ou senha inválidos");

			logoutInMemory();
		},
	});

	const handleOnSubmit = (data: LoginForm) => {
		loginMutation.mutate(data);
	};

	return (
		<div className="flex justify-center items-center h-screen flex-col gap-8">
			<img src={logo} alt="in.orbit" />
			<form
				onSubmit={form.handleSubmit(handleOnSubmit)}
				className="flex flex-col items-center gap-4 justify-center w-full max-w-sm"
			>
				<div className="w-full flex flex-col gap-2">
					<Input placeholder="Email" {...form.register("email")} />
					{form.formState.errors.email && (
						<p className="text-red-400 text-sm">
							{form.formState.errors.email.message}
						</p>
					)}
				</div>
				<div className="w-full flex flex-col gap-2">
					<Input
						type="password"
						placeholder="Senha"
						{...form.register("password")}
					/>
					{password && <PasswordStrengthChecklist password={password} />}
					{form.formState.errors.password && (
						<p className="text-red-400 text-sm">
							{form.formState.errors.password.message}
						</p>
					)}
				</div>
				<Button
					type="submit"
					className="self-start w-full"
					disabled={loginMutation.isPending || loginMutation.isSuccess}
				>
					{loginMutation.isPending ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							Entrando...
						</>
					) : (
						"Entrar"
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
	);
};
