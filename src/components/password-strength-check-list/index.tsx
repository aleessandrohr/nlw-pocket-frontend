import { Check, X } from "lucide-react";

interface PasswordStrengthChecklistProps {
	password: string;
}

export const PasswordStrengthChecklist = ({
	password,
}: PasswordStrengthChecklistProps) => {
	const checks = [
		{
			label: "Pelo menos 8 caracteres",
			isValid: password.length >= 8,
		},
		{
			label: "Pelo menos uma letra minúscula",
			isValid: /[a-z]/.test(password),
		},
		{
			label: "Pelo menos uma letra maiúscula",
			isValid: /[A-Z]/.test(password),
		},
		{
			label: "Pelo menos um número",
			isValid: /\d/.test(password),
		},
		{
			label: "Pelo menos um caractere especial (@$!%*?&)",
			isValid: /[@$!%*?&]/.test(password),
		},
	];

	return (
		<ul className="flex flex-col gap-1">
			{checks.map(check => (
				<li key={check.label} className="flex items-center gap-2 text-sm">
					{check.isValid ? (
						<Check className="h-4 w-4 text-green-400" />
					) : (
						<X className="h-4 w-4 text-red-400" />
					)}
					<p className={check.isValid ? "text-green-400" : "text-zinc-400"}>
						{check.label}
					</p>
				</li>
			))}
		</ul>
	);
};
