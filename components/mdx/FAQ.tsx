"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQProps {
	children: React.ReactNode;
}

interface FAQItem {
	question: string;
	answer: string;
}

export function FAQSection({ children }: FAQProps) {
	const [faqItems, setFaqItems] = useState<FAQItem[]>([]);

	useEffect(() => {
		// Process children to extract FAQ items
		const items: FAQItem[] = [];
		let currentItem: Partial<FAQItem> = {};

		// Convert children to array and filter out non-elements
		const childrenArray = Array.isArray(children) ? children : [children];
		childrenArray.forEach((child) => {
			if (!child || typeof child !== "object" || !("type" in child)) return;

			const element = child as { type: { name?: string }; props: { children?: string } };

			if (element.type.name === "FAQQuestion") {
				currentItem.question = String(element.props.children || "");
			} else if (element.type.name === "FAQAnswer") {
				currentItem.answer = String(element.props.children || "");
				if (currentItem.question && currentItem.answer) {
					items.push(currentItem as FAQItem);
					currentItem = {};
				}
			}
		});

		setFaqItems(items);
	}, [children]);

	const schemaData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqItems.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	return (
		<>
			<div className="my-8 space-y-6">{children}</div>
			{faqItems.length > 0 && (
				<Script id="faq-schema" type="application/ld+json">
					{JSON.stringify(schemaData)}
				</Script>
			)}
		</>
	);
}

export function FAQQuestion({ children }: FAQProps) {
	return <h3 className="text-xl font-semibold text-white mb-2">{children}</h3>;
}

export function FAQAnswer({ children }: FAQProps) {
	return <div className="text-gray-300">{children}</div>;
}

interface FAQProps {
	items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
	return (
		<div className="mt-12 space-y-4">
			<h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
			<Accordion type="single" collapsible className="w-full space-y-1">
				{items.map((item: FAQItem, index: number) => (
					<AccordionItem key={index} value={`item-${index}`} className="border-b-0">
						<AccordionTrigger className="text-left py-2 text-lg font-medium hover:no-underline hover:text-purple">{item.question}</AccordionTrigger>
						<AccordionContent className="py-1 text-gray-300">{item.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
