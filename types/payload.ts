import { Block, Field, TextField, TextareaField, NumberField, SelectField, UploadField, GroupField, ArrayField, Access, AccessArgs } from "payload";
import { Page as PayloadPage } from "@/payload-types";

export type { Block, Field, TextField, TextareaField, NumberField, SelectField, UploadField, GroupField, ArrayField, Access, AccessArgs };

type ContactBlock = {
	blockType: "contact";
	id?: string | null;
	blockName?: string | null;
};

export type Page = Omit<PayloadPage, "blocks"> & {
	blocks?: (PayloadPage["blocks"][number] | ContactBlock)[] | null;
};
