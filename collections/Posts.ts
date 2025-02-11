import { CollectionConfig } from "payload/types";
import { contentBlock } from "../blocks";

export const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "title",
		group: "Content",
		defaultColumns: ["title", "category", "status", "publishedAt"],
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
			name: "content",
			type: "blocks",
			blocks: [contentBlock],
		},
		{
			name: "excerpt",
			type: "textarea",
			required: true,
		},
		{
			name: "category",
			type: "select",
			required: true,
			options: [
				{ label: "Growing Tips", value: "growing-tips" },
				{ label: "Product Reviews", value: "product-reviews" },
				{ label: "News", value: "news" },
				{ label: "Tutorials", value: "tutorials" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "featuredImage",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				description: "This image will be used as the cover image for the post",
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
				description: "Posts will be published at this date",
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
			name: "slug",
			type: "text",
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
								.replace(/[^a-z0-9]/g, "-")
								.replace(/-+/g, "-");
						}
						return value;
					},
				],
			},
		},
		{
			name: "seo",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
					admin: {
						description: "Defaults to the post title if left blank",
					},
				},
				{
					name: "description",
					type: "textarea",
					admin: {
						description: "Defaults to the post excerpt if left blank",
					},
				},
				{
					name: "ogImage",
					type: "upload",
					relationTo: "media",
					admin: {
						description: "Defaults to the featured image if left blank",
					},
				},
			],
			admin: {
				position: "sidebar",
			},
		},
	],
	versions: {
		drafts: true,
	},
};
