import type { Block } from "@/types/payload";

export const HowItWorksBlock: Block = {
	slug: "howItWorks",
	labels: {
		singular: "How It Works Block",
		plural: "How It Works Blocks",
	},
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			label: "Heading",
		},
		{
			name: "steps",
			type: "array",
			required: true,
			minRows: 1,
			maxRows: 5,
			labels: {
				singular: "Step",
				plural: "Steps",
			},
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					label: "Step Title",
				},
				{
					name: "description",
					type: "textarea",
					required: true,
					label: "Step Description",
				},
			],
		},
		{
			name: "image",
			type: "group",
			required: true,
			fields: [
				{
					name: "url",
					type: "text",
					required: true,
					label: "Image URL",
				},
				{
					name: "alt",
					type: "text",
					required: true,
					label: "Image Alt Text",
				},
			],
		},
	],
};
