import letsStart from "@/assets/lets-start-illustration.svg";
import logo from "@/assets/logo.svg";
import { LoaderCircle } from "lucide-react";

export const Loading = () => {
	return (
		<div className="flex justify-center items-center h-screen flex-col gap-8">
			<img src={logo} alt="in.orbit" />
			<img src={letsStart} alt="in.orbit" />
			<div className="flex items-center gap-2 flex-col w-full">
				<span className="text-zinc-400 text-sm">Ativando os propulsores</span>
				<LoaderCircle className="size-8 animate-spin text-pink-500" />
			</div>
		</div>
	);
};
