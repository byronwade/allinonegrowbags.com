import type { Block } from "@/types/payload";
import { defaultMadeInUSAContent } from "./defaults";

export const MadeInUSABlock: Block = {
	slug: "madeInUSA",
	labels: {
		singular: "Made in USA Block",
		plural: "Made in USA Blocks",
	},
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			label: "Heading",
			defaultValue: defaultMadeInUSAContent.heading,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
			defaultValue: defaultMadeInUSAContent.description,
		},
		{
			name: "benefits",
			type: "array",
			label: "Benefits",
			minRows: 1,
			maxRows: 6,
			defaultValue: defaultMadeInUSAContent.benefits.map((text) => ({ text })),
			labels: {
				singular: "Benefit",
				plural: "Benefits",
			},
			fields: [
				{
					name: "text",
					type: "text",
					required: true,
					label: "Benefit Text",
				},
			],
		},
		{
			name: "image",
			type: "group",
			label: "Main Image",
			fields: [
				{
					name: "url",
					type: "text",
					required: true,
					label: "Image URL",
					defaultValue: defaultMadeInUSAContent.image.url,
				},
				{
					name: "alt",
					type: "text",
					required: true,
					label: "Image Alt Text",
					defaultValue: defaultMadeInUSAContent.image.alt,
				},
			],
		},
		{
			name: "flagImage",
			type: "group",
			label: "Flag Image",
			fields: [
				{
					name: "url",
					type: "text",
					required: true,
					label: "Flag Image URL",
					defaultValue: defaultMadeInUSAContent.flagImage.url,
				},
				{
					name: "alt",
					type: "text",
					required: true,
					label: "Flag Image Alt Text",
					defaultValue: defaultMadeInUSAContent.flagImage.alt,
				},
			],
		},
	],
} as const;
