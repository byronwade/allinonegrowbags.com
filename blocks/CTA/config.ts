import type { Block } from "@/types/payload";
import { defaultCTAContent } from "./defaults";

const defaultBenefits = ["Unmatched Quality: Our sterilized substrate and premium spawn ensure the best results.", "Beginner-Friendly: No experience needed – just follow the instructions!", "Fast and Reliable: Harvest your mushrooms in just 2-3 weeks.", "Grow Anywhere: Perfect for homes, apartments, or small spaces."].map((text) => ({ text }));

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
			defaultValue: defaultCTAContent.heading,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			label: "Description",
			defaultValue: defaultCTAContent.description,
		},
		{
			name: "benefits",
			type: "array",
			required: true,
			minRows: 1,
			maxRows: 4,
			defaultValue: defaultBenefits,
			labels: {
				singular: "Benefit",
				plural: "Benefits",
			},
			fields: [
				{
					name: "text",
					type: "textarea",
					required: true,
					label: "Benefit Text",
				},
			],
		},
		{
			name: "rating",
			type: "group",
			label: "Rating",
			fields: [
				{
					name: "score",
					type: "text",
					required: true,
					label: "Rating Score",
					defaultValue: defaultCTAContent.rating.score,
				},
				{
					name: "text",
					type: "text",
					required: true,
					label: "Rating Text",
					defaultValue: defaultCTAContent.rating.text,
				},
			],
		},
		{
			name: "limitedTimeOffer",
			type: "text",
			required: true,
			label: "Limited Time Offer Text",
			defaultValue: defaultCTAContent.limitedTimeOffer,
		},
		// Legacy fields - kept for migration
		{
			name: "primaryButtonText",
			type: "text",
			required: false,
			label: "Primary Button Text (Legacy)",
			admin: {
				hidden: true,
			},
		},
		{
			name: "primaryButtonLink",
			type: "text",
			required: false,
			label: "Primary Button Link (Legacy)",
			admin: {
				hidden: true,
			},
		},
		{
			name: "secondaryButtonText",
			type: "text",
			required: false,
			label: "Secondary Button Text (Legacy)",
			admin: {
				hidden: true,
			},
		},
		{
			name: "secondaryButtonLink",
			type: "text",
			required: false,
			label: "Secondary Button Link (Legacy)",
			admin: {
				hidden: true,
			},
		},
	],
} as const;
