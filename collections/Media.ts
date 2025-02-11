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
			label: "Alt Text",
		},
		{
			name: "caption",
			type: "text",
			label: "Caption",
		},
	],
};
