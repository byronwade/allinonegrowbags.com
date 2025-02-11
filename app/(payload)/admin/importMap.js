import { RscEntryLexicalCell, RscEntryLexicalField } from "@payloadcms/richtext-lexical/rsc";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { OverviewComponent, MetaTitleComponent, MetaDescriptionComponent, MetaImageComponent, PreviewComponent } from "@payloadcms/plugin-seo/client";

export const importMap = {
	"@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell,
	"@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField,
	"@payloadcms/richtext-lexical#lexicalEditor": lexicalEditor,
	"@payloadcms/plugin-seo/client#OverviewComponent": OverviewComponent,
	"@payloadcms/plugin-seo/client#MetaTitleComponent": MetaTitleComponent,
	"@payloadcms/plugin-seo/client#MetaDescriptionComponent": MetaDescriptionComponent,
	"@payloadcms/plugin-seo/client#MetaImageComponent": MetaImageComponent,
	"@payloadcms/plugin-seo/client#PreviewComponent": PreviewComponent,
};
