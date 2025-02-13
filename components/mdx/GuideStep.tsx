interface GuideStepProps {
	number: number;
	title: string;
	children: React.ReactNode;
}

export function GuideStep({ number, title, children }: GuideStepProps) {
	return (
		<div className="my-8 space-y-4">
			<div className="flex items-center gap-4">
				<div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple text-white font-bold">{number}</div>
				<h2 className="text-2xl font-bold text-white m-0">{title}</h2>
			</div>
			<div className="pl-14 space-y-4">{children}</div>
		</div>
	);
}
