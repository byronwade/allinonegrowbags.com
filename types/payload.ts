import { Block as PayloadBlock, Field, TextField, TextareaField, NumberField, SelectField, UploadField, GroupField, ArrayField, Access, AccessArgs } from "payload";

export interface Block extends PayloadBlock {
	slug: string;
	imageURL?: string;
	imageAlt?: string;
	fields: Field[];
	labels?: {
		singular: string;
		plural: string;
	};
}

export type { Field, TextField, TextareaField, NumberField, SelectField, UploadField, GroupField, ArrayField, Access, AccessArgs };

type ContactBlock = {
	blockType: "contact";
	id?: string | null;
	blockName?: string | null;
};

export type Page = {
	id: string;
	title: string;
	slug: string;
	status: "draft" | "published";
	blocks?: (Block | ContactBlock)[] | null;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string | null;
};
