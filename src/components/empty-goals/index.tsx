import letsStart from "@/assets/lets-start-illustration.svg";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth";
import { logout } from "@/http/auth/logout";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LogOut, Plus } from "lucide-react";
import toast from "react-hot-toast";

export const EmptyGoals = () => {
	const { logoutInMemory } = useAuth();

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			toast.success("Saiu com sucesso");
			logoutMutation.reset();

			logoutInMemory();
		},
		onError: () => {
			toast.error("Erro ao sair");
		},
	});

	return (
		<div className="h-dvh flex flex-col items-center justify-center gap-8">
			<img src={logo} alt="in.orbit" />
			<img src={letsStart} alt="in.orbit" />
			<p className="text-zinc-300 leading-relaxed  max-w-80 text-center">
				Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
			</p>
			<div className="flex items-center gap-2">
				<DialogTrigger asChild>
					<Button>
						<Plus className="size-4" />
						Cadastrar meta
					</Button>
				</DialogTrigger>
				<Button
					variant="secondary"
					data-tooltip-id="tooltip"
					data-tooltip-content="Sair"
					disabled={logoutMutation.isPending || logoutMutation.isSuccess}
					onClick={() => logoutMutation.mutate()}
				>
					{logoutMutation.isPending ? (
						<Loader2 className="animate-spin" />
					) : (
						<LogOut />
					)}
				</Button>
			</div>
		</div>
	);
};
