import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		useAPIKey: true,
		depth: 2,
	},
	admin: {
		useAsTitle: "email",
		group: "Admin",
	},
	access: {
		read: () => true,
		create: () => true,
		update: ({ req: { user } }) => {
			if (user?.roles?.includes("admin")) return true;
			return {
				id: {
					equals: user?.id,
				},
			};
		},
		delete: ({ req: { user } }) => {
			return user?.roles?.includes("admin");
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "roles",
			type: "select",
			hasMany: true,
			defaultValue: ["editor"],
			options: [
				{
					label: "Admin",
					value: "admin",
				},
				{
					label: "Editor",
					value: "editor",
				},
			],
			access: {
				read: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
				create: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
				update: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
			},
		},
	],
};
