import { Block } from "payload";

export const featuresBlock: Block = {
	slug: "features",
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
		},
		{
			name: "subheading",
			type: "text",
		},
		{
			name: "features",
			type: "array",
			required: true,
			minRows: 1,
			maxRows: 3,
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
			],
		},
	],
};
