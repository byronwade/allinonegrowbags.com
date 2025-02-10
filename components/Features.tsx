import { Microscope, Scale, Filter, Truck, HeartHandshake, Percent } from "lucide-react";

export default function Features() {
	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" aria-labelledby="features-heading">
			<div className="text-center mb-8 md:mb-12">
				<h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
					Why Choose ZugzBag?
				</h2>
				<p className="text-base sm:text-lg text-gray-300">Premium quality, consistent results, and exceptional customer service.</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
				<div className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
					<div className="flex items-center mb-3 md:mb-4">
						<Microscope className="w-6 h-6 md:w-8 md:h-8 text-purple" />
						<h3 className="text-lg md:text-xl font-semibold ml-3 text-white">Lab-Grade Sterility</h3>
					</div>
					<p className="text-sm md:text-base text-gray-300">Our bags are sterilized in an autoclave under precise conditions to ensure complete sterility and optimal growing conditions.</p>
				</div>
				<div className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
					<div className="flex items-center mb-3 md:mb-4">
						<Scale className="w-6 h-6 md:w-8 md:h-8 text-purple" />
						<h3 className="text-lg md:text-xl font-semibold ml-3 text-white">Perfect Ratio</h3>
					</div>
					<p className="text-sm md:text-base text-gray-300">Each bag contains the ideal ratio of grain to substrate, scientifically formulated for maximum yields.</p>
				</div>
				<div className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
					<div className="flex items-center mb-3 md:mb-4">
						<Filter className="w-6 h-6 md:w-8 md:h-8 text-purple" />
						<h3 className="text-lg md:text-xl font-semibold ml-3 text-white">Filter Patch</h3>
					</div>
					<p className="text-sm md:text-base text-gray-300">High-quality filter patches allow optimal gas exchange while maintaining sterility throughout the growing process.</p>
				</div>
				<div className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
					<div className="flex items-center mb-3 md:mb-4">
						<Truck className="w-6 h-6 md:w-8 md:h-8 text-purple" />
						<h3 className="text-lg md:text-xl font-semibold ml-3 text-white">Fast Shipping</h3>
					</div>
					<p className="text-sm md:text-base text-gray-300">Orders ship within 1-2 business days. Bulk orders may require additional processing time.</p>
				</div>
				<div className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
					<div className="flex items-center mb-3 md:mb-4">
						<HeartHandshake className="w-6 h-6 md:w-8 md:h-8 text-purple" />
						<h3 className="text-lg md:text-xl font-semibold ml-3 text-white">Expert Support</h3>
					</div>
					<p className="text-sm md:text-base text-gray-300">Our team of experienced growers is here to help you succeed with your cultivation projects.</p>
				</div>
				<div className="bg-secondary/50 backdrop-blur-sm border border-purple/20 p-4 md:p-6 rounded-lg">
					<div className="flex items-center mb-3 md:mb-4">
						<Percent className="w-6 h-6 md:w-8 md:h-8 text-purple" />
						<h3 className="text-lg md:text-xl font-semibold ml-3 text-white">Bulk Savings</h3>
					</div>
					<p className="text-sm md:text-base text-gray-300">Save up to 30% on bulk orders. Perfect for commercial growers and serious hobbyists.</p>
				</div>
			</div>
		</section>
	);
}
