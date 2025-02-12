import { CollectionConfig } from "payload";
import { heroBlock, contentBlock, featuresBlock, ctaBlock, referralStripBlock, howItWorksBlock, madeInUSABlock, bulkOrdersBlock, faqBlock, contactBlock } from "../blocks";

interface PageData {
	title?: string;
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
		preview: (doc) => {
			if (doc?.slug) {
				return `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`;
			}
			return `${process.env.NEXT_PUBLIC_SERVER_URL}`;
		},
	},
	access: {
		read: () => true,
		create: () => true,
		update: () => true,
		delete: () => true,
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
						if (!value && (data as PageData)?.title) {
							return (data as PageData).title
								?.toLowerCase()
								.replace(/[^a-z0-9]/g, "-")
								.replace(/-+/g, "-");
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
			blocks: [heroBlock, contentBlock, featuresBlock, ctaBlock, referralStripBlock, howItWorksBlock, madeInUSABlock, bulkOrdersBlock, faqBlock, contactBlock],
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
} as const;
