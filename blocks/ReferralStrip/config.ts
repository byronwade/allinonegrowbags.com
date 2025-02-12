import type { Block } from "@/types/payload";
import { defaultReferralStripContent } from "./defaults";

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
			defaultValue: defaultReferralStripContent.text,
		},
		{
			name: "link",
			type: "group",
			label: "Link",
			required: true,
			fields: [
				{
					name: "text",
					type: "text",
					required: true,
					label: "Link Text",
					defaultValue: defaultReferralStripContent.link.text,
				},
				{
					name: "url",
					type: "text",
					required: true,
					label: "Link URL",
					defaultValue: defaultReferralStripContent.link.url,
				},
			],
		},
	],
} as const;
