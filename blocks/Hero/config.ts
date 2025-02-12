import type { Block } from "payload";
import { defaultHeroContent } from "./defaults";

export const HeroBlock: Block = {
	slug: "hero",
	interfaceName: "HeroBlock",
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			label: "Heading",
			defaultValue: defaultHeroContent.heading,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
			defaultValue: defaultHeroContent.description,
		},
		{
			name: "mushroomTypes",
			type: "array",
			label: "Mushroom Types",
			minRows: 1,
			maxRows: 5,
			defaultValue: defaultHeroContent.mushroomTypes.map((type) => ({ type })),
			labels: {
				singular: "Mushroom Type",
				plural: "Mushroom Types",
			},
			fields: [
				{
					name: "type",
					type: "text",
					required: true,
					label: "Type",
				},
			],
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
			label: "Hero Image",
		},
		{
			name: "specs",
			type: "array",
			label: "Specifications",
			minRows: 3,
			maxRows: 3,
			defaultValue: defaultHeroContent.specs,
			labels: {
				singular: "Specification",
				plural: "Specifications",
			},
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
					label: "Label",
				},
				{
					name: "value",
					type: "text",
					required: true,
					label: "Value",
				},
			],
		},
	],
} as const;
