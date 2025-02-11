import type { Block } from "@/types/payload";

export const FeaturesBlock: Block = {
	slug: "features",
	labels: {
		singular: "Features Block",
		plural: "Features Blocks",
	},
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			label: "Heading",
		},
		{
			name: "subheading",
			type: "text",
			required: true,
			label: "Subheading",
		},
		{
			name: "features",
			type: "array",
			label: "Features",
			minRows: 3,
			maxRows: 6,
			labels: {
				singular: "Feature",
				plural: "Features",
			},
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					label: "Title",
				},
				{
					name: "description",
					type: "textarea",
					required: true,
					label: "Description",
				},
				{
					name: "icon",
					type: "select",
					required: true,
					hasMany: false,
					options: [
						{ label: "Microscope", value: "microscope" },
						{ label: "Scale", value: "scale" },
						{ label: "Filter", value: "filter" },
						{ label: "Truck", value: "truck" },
						{ label: "Heart Handshake", value: "heartHandshake" },
						{ label: "Percent", value: "percent" },
					],
				},
			],
		},
	],
} as const;
