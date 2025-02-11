import { CollectionConfig } from "payload/types";
import { heroBlock, contentBlock, featuresBlock, ctaBlock } from "../blocks";

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
			name: "content",
			type: "blocks",
			blocks: [heroBlock, contentBlock, featuresBlock, ctaBlock],
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "parent",
			type: "relationship",
			relationTo: "pages",
			hasMany: false,
			admin: {
				position: "sidebar",
				description: "If this is a sub-page, select its parent",
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
			name: "seo",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
					admin: {
						description: "Defaults to the page title if left blank",
					},
				},
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "ogImage",
					type: "upload",
					relationTo: "media",
				},
				{
					name: "noIndex",
					type: "checkbox",
					defaultValue: false,
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
	hooks: {
		beforeChange: [
			({ data }) => {
				if (data.parent && data.slug) {
					return {
						...data,
						slug: `${data.parent}/${data.slug}`,
					};
				}
				return data;
			},
		],
	},
};
