import type { Block } from "@/types/payload";
import { defaultBulkOrdersContent } from "./defaults";

export const BulkOrdersBlock: Block = {
	slug: "bulkOrders",
	labels: {
		singular: "Bulk Orders Block",
		plural: "Bulk Orders Blocks",
	},
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
			label: "Heading",
			defaultValue: defaultBulkOrdersContent.heading,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
			defaultValue: defaultBulkOrdersContent.description,
		},
		{
			name: "tiers",
			type: "array",
			required: true,
			minRows: 1,
			maxRows: 5,
			defaultValue: defaultBulkOrdersContent.tiers,
			labels: {
				singular: "Tier",
				plural: "Tiers",
			},
			fields: [
				{
					name: "quantity",
					type: "number",
					required: true,
					label: "Minimum Quantity",
					min: 1,
				},
				{
					name: "discount",
					type: "number",
					required: true,
					label: "Discount Percentage",
					min: 0,
					max: 100,
				},
			],
		},
		{
			name: "footerText",
			type: "text",
			required: true,
			label: "Footer Text",
			defaultValue: defaultBulkOrdersContent.footerText,
		},
	],
} as const;
