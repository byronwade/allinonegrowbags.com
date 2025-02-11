import type { Block } from "@/types/payload";

export const ReferralStripBlock: Block = {
	slug: "referralStrip",
	labels: {
		singular: "Referral Strip Block",
		plural: "Referral Strip Blocks",
	},
	fields: [
		{
			name: "text",
			type: "text",
			required: true,
			label: "Main Text",
		},
		{
			name: "link",
			type: "group",
			required: true,
			fields: [
				{
					name: "text",
					type: "text",
					required: true,
					label: "Link Text",
				},
				{
					name: "url",
					type: "text",
					required: true,
					label: "Link URL",
				},
			],
		},
	],
};
