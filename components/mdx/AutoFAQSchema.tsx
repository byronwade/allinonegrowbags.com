"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface FAQItem {
	question: string;
	answer: string;
}

interface SchemaQuestion {
	"@type": "Question";
	name: string;
	acceptedAnswer: {
		"@type": "Answer";
		text: string;
	};
}

interface FAQSchema {
	"@type": "FAQPage";
	mainEntity: SchemaQuestion[];
	"@context": string;
}

interface AutoFAQSchemaProps {
	content: string;
}

export function AutoFAQSchema({ content }: AutoFAQSchemaProps) {
	const [faqItems, setFaqItems] = useState<FAQItem[]>([]);

	useEffect(() => {
		// Extract FAQ items from content using regex
		const faqRegex = /<FAQQuestion>(.*?)<\/FAQQuestion>\s*<FAQAnswer>(.*?)<\/FAQAnswer>/gm;
		const matches = Array.from(content.matchAll(faqRegex));

		const items = matches.map((match) => ({
			question: match[1].trim(),
			answer: match[2].trim(),
		}));

		// Also try to extract from manual schema if it exists
		const schemaRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gm;
		const schemaMatches = Array.from(content.matchAll(schemaRegex));

		schemaMatches.forEach((match) => {
			try {
				const schema = JSON.parse(match[1]) as FAQSchema;
				if (schema["@type"] === "FAQPage" && Array.isArray(schema.mainEntity)) {
					const schemaItems = schema.mainEntity.map((item: SchemaQuestion) => ({
						question: item.name,
						answer: item.acceptedAnswer.text,
					}));
					items.push(...schemaItems);
				}
			} catch (e) {
				console.warn("Failed to parse FAQ schema:", e);
			}
		});

		setFaqItems(items);
	}, [content]);

	if (faqItems.length === 0) return null;

	const schemaData: FAQSchema = {
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
		<Script id="faq-schema" type="application/ld+json">
			{JSON.stringify(schemaData)}
		</Script>
	);
}
