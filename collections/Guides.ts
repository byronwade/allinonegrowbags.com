import { CollectionConfig } from "payload/types";
import { contentBlock } from "../blocks";

export const Guides: CollectionConfig = {
	slug: "guides",
	admin: {
		useAsTitle: "title",
		group: "Content",
		defaultColumns: ["title", "difficulty", "status", "publishedAt"],
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
			name: "difficulty",
			type: "select",
			required: true,
			options: [
				{ label: "Beginner", value: "beginner" },
				{ label: "Intermediate", value: "intermediate" },
				{ label: "Advanced", value: "advanced" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "timeToComplete",
			type: "group",
			fields: [
				{
					name: "value",
					type: "number",
					required: true,
				},
				{
					name: "unit",
					type: "select",
					required: true,
					options: [
						{ label: "Minutes", value: "minutes" },
						{ label: "Hours", value: "hours" },
						{ label: "Days", value: "days" },
						{ label: "Weeks", value: "weeks" },
					],
				},
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
	],
	versions: {
		drafts: true,
	},
};
