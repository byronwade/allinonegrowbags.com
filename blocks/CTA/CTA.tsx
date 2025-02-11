"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Route } from "next";

interface CTAProps {
	heading: string;
	description: string;
	primaryButtonText: string;
	primaryButtonLink: Route;
	secondaryButtonText?: string;
	secondaryButtonLink?: Route;
}

export const CTA: React.FC<CTAProps> = ({ heading, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }) => {
	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" id="cta" aria-labelledby="cta-heading">
			<div className="max-w-3xl mx-auto text-center">
				<h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
					{heading}
				</h2>
				<p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">{description}</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Link href={primaryButtonLink} legacyBehavior>
						<a>
							<Button className="w-full sm:w-auto bg-purple hover:bg-purple-dark text-white text-base sm:text-lg px-8 py-3">
								<ShoppingCart className="w-5 h-5 mr-2" />
								{primaryButtonText}
							</Button>
						</a>
					</Link>
					{secondaryButtonText && secondaryButtonLink && (
						<Link href={secondaryButtonLink} legacyBehavior>
							<a>
								<Button variant="outline" className="w-full sm:w-auto text-white border-purple hover:bg-purple/10 text-base sm:text-lg px-8 py-3">
									{secondaryButtonText}
								</Button>
							</a>
						</Link>
					)}
				</div>
			</div>
		</section>
	);
};
