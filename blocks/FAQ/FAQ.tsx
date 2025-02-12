"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
	question: string;
	answer: string;
}

interface FAQProps {
	heading: string;
	description: string;
	faqs: FAQItem[];
}

export const FAQ = ({ heading, description, faqs }: FAQProps) => {
	// Early return with loading state if any required prop is missing
	if (!heading || !description || !Array.isArray(faqs)) {
		console.warn("FAQ block missing required props:", { heading, description, faqs });
		return (
			<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" id="faq" aria-labelledby="faq-heading">
				<div className="max-w-4xl mx-auto">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
						<div className="h-4 bg-gray-700 rounded w-2/3 mx-auto mb-8"></div>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div key={i} className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-purple/20 p-4">
									<div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
									<div className="h-3 bg-gray-700 rounded w-1/2"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Early return if faqs array is empty
	if (faqs.length === 0) {
		console.warn("FAQ block has empty faqs array");
		return null;
	}

	// Validate each FAQ item
	const validFaqs = faqs.filter((faq) => faq && typeof faq.question === "string" && typeof faq.answer === "string");

	if (validFaqs.length === 0) {
		console.warn("FAQ block has no valid FAQ items");
		return null;
	}

	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" id="faq" aria-labelledby="faq-heading">
			<div className="max-w-4xl mx-auto">
				<h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-white">
					{heading}
				</h2>
				<p className="text-base sm:text-lg text-gray-300 text-center mb-8 sm:mb-10">{description}</p>
				<Accordion type="single" collapsible className="space-y-4">
					{validFaqs.map((faq, index) => (
						<AccordionItem key={`faq-${index}`} value={`item-${index}`} className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-purple/20">
							<AccordionTrigger className="text-base sm:text-lg text-white px-4 sm:px-6 hover:text-purple">{faq.question}</AccordionTrigger>
							<AccordionContent className="text-sm sm:text-base text-gray-300 px-4 sm:px-6 pb-4">{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};
