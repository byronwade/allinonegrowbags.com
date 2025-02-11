import { CollectionConfig } from "payload";
import type { Block } from "payload/types";
import { contentBlock } from "../blocks";

interface PostData {
	title?: string;
	status?: string;
}

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
			required: true,
			blocks: [contentBlock] as Block[],
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
				{ label: "Growing Guides", value: "growing-guides" },
				{ label: "Mushroom Species", value: "mushroom-species" },
				{ label: "Equipment Reviews", value: "equipment-reviews" },
				{ label: "Success Stories", value: "success-stories" },
				{ label: "Industry News", value: "industry-news" },
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
						if ((siblingData as PostData).status === "published") {
							return new Date().toISOString();
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
						if (!value && (data as PostData)?.title) {
							return (data as PostData).title
								?.toLowerCase()
								.replace(/[^a-z0-9]/g, "-")
								.replace(/-+/g, "-");
						}
						return value;
					},
				],
			},
		},
	],
	versions: {
		drafts: true,
	},
};
