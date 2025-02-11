import { CollectionConfig } from "payload";

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
								{ label: "Instagram", value: "instagram" },
								{ label: "YouTube", value: "youtube" },
								{ label: "TikTok", value: "tiktok" },
								{ label: "Pinterest", value: "pinterest" },
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
