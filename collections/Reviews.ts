import { CollectionConfig } from "payload";

interface ReviewData {
	status?: string;
	modifiedAt?: string;
}

export const Reviews: CollectionConfig = {
	slug: "reviews",
	admin: {
		useAsTitle: "customerName",
		group: "Content",
		defaultColumns: ["customerName", "rating", "status", "createdAt"],
	},
	access: {
		read: () => true,
		create: () => true,
	},
	fields: [
		{
			name: "customerName",
			type: "text",
			required: true,
		},
		{
			name: "rating",
			type: "number",
			required: true,
			min: 1,
			max: 5,
			admin: {
				description: "Rate from 1 to 5 stars",
			},
		},
		{
			name: "reviewText",
			type: "textarea",
			required: true,
		},
		{
			name: "purchasedProduct",
			type: "text",
			required: true,
		},
		{
			name: "customerLocation",
			type: "text",
		},
		{
			name: "customerImage",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Optional customer photo",
			},
		},
		{
			name: "verifiedPurchase",
			type: "checkbox",
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Check if this review is from a verified purchase",
			},
		},
		{
			name: "status",
			type: "select",
			required: true,
			defaultValue: "pending",
			options: [
				{
					label: "Pending",
					value: "pending",
				},
				{
					label: "Approved",
					value: "approved",
				},
				{
					label: "Rejected",
					value: "rejected",
				},
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "featured",
			type: "checkbox",
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Feature this review on the website",
			},
		},
		{
			name: "adminNotes",
			type: "textarea",
			admin: {
				position: "sidebar",
				description: "Internal notes about this review",
			},
		},
	],
	hooks: {
		beforeChange: [
			({ data }) => {
				return {
					...data,
					modifiedAt: new Date().toISOString(),
				};
			},
		],
	},
	timestamps: true,
};
