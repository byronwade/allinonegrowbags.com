"use client";

import ShopifyCheckout from "@/components/ShopifyCheckout";
import { CheckCircle } from "lucide-react";
import { defaultCTAContent } from "./defaults";

export default function CTA() {
	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" aria-labelledby="cta-heading">
			<div className="relative grid md:grid-cols-2 gap-8">
				{/* Left Column - Content */}
				<div className="space-y-6">
					<div className="space-y-4">
						<h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
							{defaultCTAContent.heading}
						</h2>
						<p className="text-lg md:text-xl text-gray-300">{defaultCTAContent.description}</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{defaultCTAContent.benefits.map((benefit, index) => (
							<div key={`benefit-${index}`} className="flex items-center space-x-2">
								<CheckCircle className="w-5 h-5 text-purple" />
								<span className="text-sm md:text-base text-gray-300">{benefit.text}</span>
							</div>
						))}
					</div>

					<div className="relative">
						<div className="flex items-center space-x-4">
							<div className="flex -space-x-2">
								{[...Array(3)].map((_, i) => (
									<div key={`star-${i}`} className="w-8 h-8 rounded-full bg-purple/20 border-2 border-purple flex items-center justify-center">
										<span className="text-xs text-white">★</span>
									</div>
								))}
							</div>
							<div className="text-sm text-gray-300">
								<span className="text-white font-semibold">{defaultCTAContent.rating.score}</span> {defaultCTAContent.rating.text}
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Checkout */}
				<div className="relative">
					<div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-purple/20">
						<div className="absolute -top-3 -right-3 bg-purple px-4 py-1 rounded-full">
							<span className="text-sm font-semibold text-white">{defaultCTAContent.limitedTimeOffer}</span>
						</div>
						<ShopifyCheckout />
					</div>
				</div>
			</div>
		</section>
	);
}
