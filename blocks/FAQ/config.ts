import type { Block } from "@/types/payload";
import { defaultFAQContent } from "./defaults";

export const FAQBlock: Block = {
	slug: "faq",
	labels: {
		singular: "FAQ Block",
		plural: "FAQ Blocks",
	},
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			label: "Heading",
			defaultValue: defaultFAQContent.heading,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
			defaultValue: defaultFAQContent.description,
		},
		{
			name: "faqs",
			type: "array",
			required: true,
			minRows: 1,
			defaultValue: defaultFAQContent.faqs,
			labels: {
				singular: "FAQ Item",
				plural: "FAQ Items",
			},
			fields: [
				{
					name: "question",
					type: "text",
					required: true,
					label: "Question",
				},
				{
					name: "answer",
					type: "textarea",
					required: true,
					label: "Answer",
				},
			],
		},
	],
} as const;
