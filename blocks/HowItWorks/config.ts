import type { Block } from "@/types/payload";
import { defaultHowItWorksContent } from "./defaults";

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
			defaultValue: defaultHowItWorksContent.heading,
		},
		{
			name: "steps",
			type: "array",
			label: "Steps",
			minRows: 1,
			maxRows: 5,
			defaultValue: defaultHowItWorksContent.steps,
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
			label: "Image",
			fields: [
				{
					name: "url",
					type: "text",
					required: true,
					label: "Image URL",
					defaultValue: defaultHowItWorksContent.image.url,
				},
				{
					name: "alt",
					type: "text",
					required: true,
					label: "Image Alt Text",
					defaultValue: defaultHowItWorksContent.image.alt,
				},
			],
		},
	],
} as const;
