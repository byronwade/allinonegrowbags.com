interface GuideStepProps {
	number: number;
	title: string;
	children: React.ReactNode;
}

export function GuideStep({ number, title, children }: GuideStepProps) {
	return (
		<div className="flex flex-col md:flex-row gap-6 mb-8 p-6 rounded-lg bg-secondary/50 border border-purple/20">
			{/* Step Number Column */}
			<div className="flex flex-col items-center md:w-32 p-4 bg-background rounded-lg">
				<span className="text-4xl font-bold text-purple mb-2">{number}</span>
				<h6 className="text-sm text-gray-400">Step {number}</h6>
			</div>

			{/* Content Column */}
			<div className="flex-1 space-y-4">
				<h4 className="text-2xl font-semibold text-white">{title}</h4>
				<div className="text-gray-300 leading-relaxed">{children}</div>
			</div>
		</div>
	);
}
