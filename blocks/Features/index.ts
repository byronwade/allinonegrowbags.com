import type { Block } from "@/types/payload";
import { defaultFeaturesContent } from "./defaults";

export const featuresBlock: Block = {
	slug: "features",
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			defaultValue: defaultFeaturesContent.heading,
		},
		{
			name: "subheading",
			type: "text",
			required: true,
			defaultValue: defaultFeaturesContent.subheading,
		},
		{
			name: "features",
			type: "array",
			required: true,
			minRows: 3,
			maxRows: 6,
			defaultValue: defaultFeaturesContent.features,
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
					required: true,
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
