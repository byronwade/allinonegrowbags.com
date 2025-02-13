interface StepsProps {
	children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
	return <div className="[&>*]:step mb-12 ml-4 border-l border-gray-700 pl-8 [counter-reset:step]">{children}</div>;
}
