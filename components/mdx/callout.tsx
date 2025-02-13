import { cn } from "@/lib/utils";

interface CalloutProps {
	children: React.ReactNode;
	type?: "info" | "warning" | "tip" | "success";
	icon?: string;
}

const typeStyles = {
	info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
	warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200",
	tip: "bg-green-500/10 border-green-500/20 text-green-200",
	success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
};

export function Callout({ children, type = "info", icon }: CalloutProps) {
	return (
		<div className={`my-6 rounded-lg border p-4 ${typeStyles[type]}`}>
			<div className="flex items-start gap-4">
				{icon && <span className="text-xl">{icon}</span>}
				<div>{children}</div>
			</div>
		</div>
	);
}
