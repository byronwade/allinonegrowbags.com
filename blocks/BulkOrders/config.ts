import type { Block } from "@/types/payload";

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
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
		},
		{
			name: "tiers",
			type: "array",
			required: true,
			minRows: 1,
			maxRows: 5,
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
		},
	],
};
