import type { Block } from "@/types/payload";

export const CTABlock: Block = {
	slug: "cta",
	labels: {
		singular: "CTA Block",
		plural: "CTA Blocks",
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
			name: "primaryButtonText",
			type: "text",
			required: true,
			label: "Primary Button Text",
		},
		{
			name: "primaryButtonLink",
			type: "text",
			required: true,
			label: "Primary Button Link",
		},
		{
			name: "secondaryButtonText",
			type: "text",
			required: false,
			label: "Secondary Button Text",
		},
		{
			name: "secondaryButtonLink",
			type: "text",
			required: false,
			label: "Secondary Button Link",
		},
	],
};
