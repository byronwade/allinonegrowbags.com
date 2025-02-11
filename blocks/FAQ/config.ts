import type { Block } from "@/types/payload";

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
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
		},
		{
			name: "faqs",
			type: "array",
			required: true,
			minRows: 1,
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
};
