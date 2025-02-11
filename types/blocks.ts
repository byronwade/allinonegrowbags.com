import { Block as PayloadBlock, Field } from "payload/types";

export interface BaseField {
	name: string;
	type: string;
	required?: boolean;
	label?: string;
}

export interface TextField extends BaseField {
	type: "text";
	defaultValue?: string;
}

export interface TextareaField extends BaseField {
	type: "textarea";
	defaultValue?: string;
}

export interface ArrayField extends BaseField {
	type: "array";
	minRows?: number;
	maxRows?: number;
	defaultValue?: Record<string, unknown>[];
	labels?: {
		singular: string;
		plural: string;
	};
	fields: BaseField[];
}

export interface SelectField extends BaseField {
	type: "select";
	options: {
		label: string;
		value: string;
	}[];
	defaultValue?: string | string[];
}

export interface UploadField extends BaseField {
	type: "upload";
	relationTo: string;
}

export type BlockField = TextField | TextareaField | SelectField | UploadField | ArrayField;

export interface Block extends PayloadBlock {
	slug: string;
	labels?: {
		singular: string;
		plural: string;
	};
	fields: Field[];
}
