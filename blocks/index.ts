import { Block } from "payload/types";

export const heroBlock: Block = {
	slug: "hero",
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
		},
		{
			name: "subheading",
			type: "textarea",
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "ctaButton",
			type: "group",
			fields: [
				{
					name: "label",
					type: "text",
				},
				{
					name: "link",
					type: "text",
				},
			],
		},
	],
};

export const contentBlock: Block = {
	slug: "content",
	fields: [
		{
			name: "content",
			type: "richText",
			required: true,
		},
	],
};

export const featuresBlock: Block = {
	slug: "features",
	fields: [
		{
			name: "heading",
			type: "text",
		},
		{
			name: "features",
			type: "array",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "icon",
					type: "text",
				},
			],
		},
	],
};

export const ctaBlock: Block = {
	slug: "cta",
	fields: [
		{
			name: "heading",
			type: "text",
			required: true,
		},
		{
			name: "content",
			type: "textarea",
		},
		{
			name: "buttons",
			type: "array",
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
				},
				{
					name: "link",
					type: "text",
					required: true,
				},
				{
					name: "variant",
					type: "select",
					options: [
						{ label: "Primary", value: "primary" },
						{ label: "Secondary", value: "secondary" },
					],
				},
			],
		},
		{
			name: "backgroundImage",
			type: "upload",
			relationTo: "media",
		},
	],
};
