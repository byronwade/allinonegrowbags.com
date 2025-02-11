import { Block } from "payload/types";

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
			required: true,
		},
		{
			name: "features",
			type: "array",
			required: true,
			minRows: 3,
			maxRows: 6,
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
