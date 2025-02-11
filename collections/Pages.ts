import { CollectionConfig } from "payload";
import { heroBlock, contentBlock, featuresBlock, ctaBlock, referralStripBlock, howItWorksBlock, madeInUSABlock, bulkOrdersBlock, faqBlock } from "../blocks";

interface PageData {
	isHomePage?: boolean;
	slug?: string;
	parent?: string;
	status?: string;
}

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
		group: "Content",
		defaultColumns: ["title", "slug", "status", "updatedAt"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "isHomePage",
			type: "checkbox",
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Is this the home page?",
			},
		},
		{
			name: "parent",
			type: "relationship",
			relationTo: "pages",
			hasMany: false,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			admin: {
				position: "sidebar",
			},
			hooks: {
				beforeValidate: [
					({ value, data }) => {
						if (!value && data?.title) {
							return data.title
								.toLowerCase()
								.replace(/ /g, "-")
								.replace(/[^\w-]+/g, "");
						}
						return value;
					},
				],
			},
		},
		{
			name: "status",
			type: "select",
			required: true,
			defaultValue: "draft",
			options: [
				{
					label: "Draft",
					value: "draft",
				},
				{
					label: "Published",
					value: "published",
				},
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar",
				description: "Date this page was published",
			},
			hooks: {
				beforeChange: [
					({ siblingData }) => {
						if (siblingData.status === "published") {
							return new Date();
						}
						return undefined;
					},
				],
			},
		},
		{
			name: "blocks",
			type: "blocks",
			blocks: [heroBlock, contentBlock, featuresBlock, ctaBlock, referralStripBlock, howItWorksBlock, madeInUSABlock, bulkOrdersBlock, faqBlock],
		},
	],
	hooks: {
		beforeChange: [
			async ({ req, data }) => {
				const { isHomePage } = data as PageData;

				if (isHomePage) {
					// If this page is being set as home, unset any other home pages
					await req.payload.update({
						collection: "pages",
						where: {
							isHomePage: {
								equals: true,
							},
						},
						data: {
							isHomePage: false,
						},
					});
				}

				return data;
			},
		],
	},
	versions: {
		drafts: true,
	},
};
