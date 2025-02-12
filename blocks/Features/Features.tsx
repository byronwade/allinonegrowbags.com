"use client";

import { Filter, HeartHandshake, Microscope, Percent, Scale, Truck } from "lucide-react";

interface Feature {
	title: string;
	description: string;
	icon: "microscope" | "scale" | "filter" | "truck" | "heartHandshake" | "percent";
}

interface FeaturesProps {
	heading: string;
	subheading?: string;
	features: Feature[];
}

const iconMap = {
	microscope: Microscope,
	scale: Scale,
	filter: Filter,
	truck: Truck,
	heartHandshake: HeartHandshake,
	percent: Percent,
};

export const Features = ({ heading, subheading, features }: FeaturesProps) => {
	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" aria-labelledby="features-heading">
			<div className="text-center mb-8 md:mb-12">
				<h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
					{heading}
				</h2>
				{subheading && <p className="text-base sm:text-lg text-gray-300">{subheading}</p>}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
				{features.map((feature, index) => {
					const Icon = iconMap[feature.icon];
					return (
						<div key={index} className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
							<div className="flex items-center gap-3">
								{Icon && <Icon className="w-6 h-6 text-purple" />}
								<h3 className="text-lg md:text-xl font-semibold mb-3 text-white">{feature.title}</h3>
							</div>
							<p className="text-sm md:text-base text-gray-300">{feature.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};
