import { CollectionConfig } from "payload/types";

export const Settings: CollectionConfig = {
	slug: "settings",
	admin: {
		useAsTitle: "siteName",
		group: "Global Settings",
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "siteName",
			type: "text",
			required: true,
		},
		{
			name: "seo",
			type: "group",
			fields: [
				{
					name: "defaultMeta",
					type: "group",
					fields: [
						{
							name: "title",
							type: "text",
							required: true,
						},
						{
							name: "description",
							type: "textarea",
							required: true,
						},
						{
							name: "ogImage",
							type: "upload",
							relationTo: "media",
						},
					],
				},
			],
		},
		{
			name: "header",
			type: "group",
			fields: [
				{
					name: "logo",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "navigation",
					type: "relationship",
					relationTo: "navigation",
					hasMany: false,
				},
			],
		},
		{
			name: "footer",
			type: "group",
			fields: [
				{
					name: "navigation",
					type: "relationship",
					relationTo: "navigation",
					hasMany: false,
				},
				{
					name: "socialLinks",
					type: "array",
					fields: [
						{
							name: "platform",
							type: "select",
							required: true,
							options: [
								{ label: "Facebook", value: "facebook" },
								{ label: "Twitter", value: "twitter" },
								{ label: "Instagram", value: "instagram" },
								{ label: "LinkedIn", value: "linkedin" },
								{ label: "YouTube", value: "youtube" },
							],
						},
						{
							name: "url",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "contact",
			type: "group",
			fields: [
				{
					name: "email",
					type: "email",
					required: true,
				},
				{
					name: "phone",
					type: "text",
				},
				{
					name: "address",
					type: "group",
					fields: [
						{
							name: "line1",
							type: "text",
						},
						{
							name: "line2",
							type: "text",
						},
						{
							name: "city",
							type: "text",
						},
						{
							name: "state",
							type: "text",
						},
						{
							name: "postal_code",
							type: "text",
						},
						{
							name: "country",
							type: "text",
						},
					],
				},
			],
		},
	],
	versions: {
		drafts: true,
	},
};
