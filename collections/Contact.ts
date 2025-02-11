import { CollectionConfig } from "payload";

export const Contact: CollectionConfig = {
	slug: "contact",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "email", "subject", "createdAt"],
	},
	access: {
		create: () => true,
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
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
			name: "subject",
			type: "select",
			required: true,
			options: [
				{
					label: "General Inquiry",
					value: "general",
				},
				{
					label: "Bulk Order",
					value: "bulk",
				},
				{
					label: "Growing Support",
					value: "support",
				},
				{
					label: "Wholesale",
					value: "wholesale",
				},
				{
					label: "Other",
					value: "other",
				},
			],
		},
		{
			name: "message",
			type: "textarea",
			required: true,
		},
		{
			name: "status",
			type: "select",
			defaultValue: "new",
			options: [
				{
					label: "New",
					value: "new",
				},
				{
					label: "In Progress",
					value: "in-progress",
				},
				{
					label: "Completed",
					value: "completed",
				},
				{
					label: "Archived",
					value: "archived",
				},
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "notes",
			type: "textarea",
			admin: {
				description: "Internal notes about this inquiry",
				position: "sidebar",
			},
		},
	],
	timestamps: true,
};
