import logo from "@/assets/logo.svg";
import { PasswordStrengthChecklist } from "@/components/password-strength-check-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { createUser } from "@/http/auth/create-user/post";
import { getCsrfToken } from "@/http/auth/csrf-token/get";
import {
	type CreateUserForm,
	createUserFormSchema,
} from "@/schemas/create-user-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const CreateUserRoute = () => {
	const { loginInMemory, logoutInMemory } = useAuth();

	const form = useForm<CreateUserForm>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(createUserFormSchema),
	});

	const password = form.watch("password");
	const confirmPassword = form.watch("confirmPassword");

	const isPasswordMatch = password === confirmPassword;

	const createUserMutation = useMutation({
		mutationFn: (data: CreateUserForm) =>
			createUser({
				name: data.name,
				email: data.email,
				password: data.password,
			}),
		onSuccess: async user => {
			toast.success("Usuário criado com sucesso");

			const { csrfToken } = await getCsrfToken();

			loginInMemory(user, csrfToken);
		},
		onError: () => {
			toast.error("Erro ao criar usuário");

			logoutInMemory();
		},
	});

	const handleOnSubmit = (data: CreateUserForm) => {
		createUserMutation.mutate(data);
	};

	return (
		<div className="flex justify-center items-center h-dvh flex-col gap-8 px-5">
			<img src={logo} alt="in.orbit" />
			<form
				onSubmit={form.handleSubmit(handleOnSubmit)}
				className="flex flex-col items-center gap-4 justify-center w-full max-w-sm"
			>
				<div className="w-full flex flex-col gap-2">
					<Input placeholder="Nome" {...form.register("name")} />
					{form.formState.errors.name && (
						<p className="text-red-400 text-sm">
							{form.formState.errors.name.message}
						</p>
					)}
				</div>
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
				<div className="w-full flex flex-col gap-2">
					<Input
						type="password"
						placeholder="Confirmar senha"
						{...form.register("confirmPassword")}
					/>
					{password && !isPasswordMatch && (
						<p className="text-red-400 text-sm">As senhas não coincidem</p>
					)}
				</div>
				<Button
					type="submit"
					className="self-start w-full"
					disabled={
						createUserMutation.isPending || createUserMutation.isSuccess
					}
				>
					{createUserMutation.isPending ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							Criando usuário...
						</>
					) : (
						"Criar usuário"
					)}
				</Button>
				<div className="flex items-center gap-1">
					<p className="text-sm text-zinc-400">Já tem uma conta?</p>
					<Link to="/auth/login" className="text-sm text-zinc-100">
						Entrar
					</Link>
				</div>
			</form>
		</div>
	);
};
