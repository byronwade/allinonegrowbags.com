import { cn } from "@/lib/utils";

interface CalloutProps {
	children: React.ReactNode;
	type?: "info" | "warning" | "error" | "success";
	icon?: string;
}

const styles = {
	info: "bg-blue-500/20 border-blue-500/30 text-blue-200",
	warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-200",
	error: "bg-red-500/20 border-red-500/30 text-red-200",
	success: "bg-green-500/20 border-green-500/30 text-green-200",
};

export function Callout({ children, type = "info", icon }: CalloutProps) {
	return (
		<div className={cn("my-6 flex gap-2.5 rounded-lg border p-4", styles[type])}>
			{icon && <span className="text-2xl">{icon}</span>}
			<div className="flex-1">{children}</div>
		</div>
	);
}
