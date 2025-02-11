import type { Block } from "@/types/payload";

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
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
		},
		{
			name: "benefits",
			type: "array",
			required: true,
			minRows: 1,
			maxRows: 6,
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
		{
			name: "flagImage",
			type: "group",
			required: true,
			fields: [
				{
					name: "url",
					type: "text",
					required: true,
					label: "Flag Image URL",
				},
				{
					name: "alt",
					type: "text",
					required: true,
					label: "Flag Image Alt Text",
				},
			],
		},
	],
};
