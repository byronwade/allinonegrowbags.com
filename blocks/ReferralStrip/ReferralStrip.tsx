"use client";

interface ReferralStripProps {
	text: string;
	link: {
		text: string;
		url: string;
	};
}

export const ReferralStrip: React.FC<ReferralStripProps> = ({ text, link }) => {
	return (
		<div className="bg-purple">
			<div className="container px-4 py-3 mx-auto">
				<div className="flex items-center justify-center space-x-2 text-sm text-white md:text-base">
					<span>{text}</span>
					<a href={link.url} className="underline hover:text-white/80">
						{link.text}
					</a>
				</div>
			</div>
		</div>
	);
};
