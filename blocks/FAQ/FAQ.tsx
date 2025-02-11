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

export const FAQ: React.FC<FAQProps> = ({ heading, description, faqs }) => {
	return (
		<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8" id="faq" aria-labelledby="faq-heading">
			<div className="max-w-4xl mx-auto">
				<h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-white">
					{heading}
				</h2>
				<p className="text-base sm:text-lg text-gray-300 text-center mb-8 sm:mb-10">{description}</p>
				<Accordion type="single" collapsible className="space-y-4">
					{faqs.map((faq, index) => (
						<AccordionItem key={index} value={`item-${index}`} className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-purple/20">
							<AccordionTrigger className="text-base sm:text-lg text-white px-4 sm:px-6 hover:text-purple">{faq.question}</AccordionTrigger>
							<AccordionContent className="text-sm sm:text-base text-gray-300 px-4 sm:px-6 pb-4">{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};
