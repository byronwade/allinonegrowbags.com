"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface Step {
	title: string;
	description: string;
}

interface HowItWorksProps {
	heading: string;
	steps: Step[];
	image: {
		url: string;
		alt: string;
	};
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ heading, steps, image }) => {
	return (
		<section className="container mx-auto py-8 md:py-12 px-4" id="how-it-works" aria-labelledby="how-it-works-heading">
			<h2 id="how-it-works-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-white">
				{heading}
			</h2>
			<div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
				<div className="md:w-1/2">
					{steps.map((step, index) => (
						<div key={index} className="flex items-start mb-6 md:mb-8 group">
							<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple flex items-center justify-center text-base md:text-lg font-bold text-white mr-3 md:mr-4 flex-shrink-0 group-hover:bg-purple-dark transition-colors">{index + 1}</div>
							<div>
								<h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">{step.title}</h3>
								<p className="text-sm md:text-base text-gray-400">{step.description}</p>
							</div>
						</div>
					))}
					<div className="text-center mt-6 md:mt-8">
						<p className="text-lg md:text-xl text-white flex items-center justify-center">
							<CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
							It&apos;s that simple with ZugzBag All-in-One Grow Bags!
						</p>
					</div>
				</div>
				<div className="md:w-1/2">
					<div className="relative">
						<div className="absolute inset-0 bg-primary/10 rounded-lg backdrop-blur-sm"></div>
						<Image src={image.url} alt={image.alt} width={500} height={500} className="rounded-lg relative z-10" />
					</div>
				</div>
			</div>
		</section>
	);
};
