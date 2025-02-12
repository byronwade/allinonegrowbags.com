"use client";

import Image from "next/image";

interface MadeInUSAProps {
	heading: string;
	description: string;
	benefits: Array<{ text: string }>;
	image: {
		url: string;
		alt: string;
	};
	flagImage: {
		url: string;
		alt: string;
	};
}

export const MadeInUSA = ({ heading, description, benefits, image, flagImage }: MadeInUSAProps) => {
	return (
		<section className="container mx-auto py-8 md:py-12 px-4" aria-labelledby="made-in-usa-heading">
			<div className="flex flex-col md:flex-row items-center justify-between">
				<div className="md:w-1/2 mb-6 md:mb-0">
					<h2 id="made-in-usa-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
						{heading}
					</h2>
					<p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-gray-300">{description}</p>
					<ul className="list-disc list-inside text-sm md:text-base text-gray-300 space-y-1 md:space-y-2">
						{benefits.map((benefit, index) => (
							<li key={index}>{benefit.text}</li>
						))}
					</ul>
				</div>
				<div className="md:w-1/2 flex justify-center">
					<div className="relative">
						<Image src={image.url} alt={image.alt} width={600} height={450} className="rounded-lg shadow-2xl" priority />
						<div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-3 md:p-4 rounded-lg shadow-xl">
							<Image src={flagImage.url} alt={flagImage.alt} width={100} height={60} className="rounded" priority />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
