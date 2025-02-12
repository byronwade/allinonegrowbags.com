import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	upload: {
		adminThumbnail: "thumbnail",
		mimeTypes: ["image/*", "video/*"],
		staticDir: "media",
		resizeOptions: {
			width: 1920,
			height: 1080,
			position: "centre",
		},
		imageSizes: [
			{
				name: "thumbnail",
				width: 400,
				height: 300,
				position: "centre",
			},
			{
				name: "card",
				width: 768,
				height: 1024,
				position: "centre",
			},
			{
				name: "desktop",
				width: 1920,
				height: 1080,
				position: "centre",
			},
		],
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: false,
			defaultValue: "",
			label: "Alt Text",
			admin: {
				description: "Provide a descriptive text that explains the image for screen readers and SEO",
			},
			hooks: {
				beforeValidate: [
					({ value, data }: { value: string | null; data?: { filename?: string } }) => {
						if (!value && data?.filename) {
							return data.filename.split(".").slice(0, -1).join(".");
						}
						return value || "";
					},
				],
			},
		},
		{
			name: "caption",
			type: "text",
			label: "Caption",
			required: false,
			defaultValue: "",
		},
	],
	hooks: {
		beforeChange: [
			({ data }: { data: { alt?: string | null; filename?: string } }) => {
				if (!data.alt) {
					data.alt = data.filename ? data.filename.split(".").slice(0, -1).join(".") : "Image";
				}
				return data;
			},
		],
	},
};
