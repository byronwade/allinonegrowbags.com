"use client";

interface Feature {
	title: string;
	description: string;
}

interface FeaturesProps {
	heading: string;
	subheading: string;
	features: Feature[];
}

export const Features: React.FC<FeaturesProps> = ({ heading, subheading, features }) => {
	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" aria-labelledby="features-heading">
			<div className="text-center mb-8 md:mb-12">
				<h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
					{heading}
				</h2>
				<p className="text-base sm:text-lg text-gray-300">{subheading}</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
				{features.map((feature, index) => (
					<div key={index} className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
						<div className="mb-3 md:mb-4">
							<h3 className="text-lg md:text-xl font-semibold text-white">{feature.title}</h3>
						</div>
						<p className="text-sm md:text-base text-gray-300">{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};
