// Block Components
export { Hero } from "./Hero/Hero";
export { Features } from "./Features/Features";
export { ReferralStrip } from "./ReferralStrip/ReferralStrip";
export { HowItWorks } from "./HowItWorks/HowItWorks";
export { MadeInUSA } from "./MadeInUSA/MadeInUSA";
export { BulkOrders } from "./BulkOrders/BulkOrders";
export { FAQ } from "./FAQ/FAQ";
export { CTA } from "./CTA/CTA";

// Block Configs
import { HeroBlock } from "./Hero/config";
import { FeaturesBlock } from "./Features/config";
import { ReferralStripBlock } from "./ReferralStrip/config";
import { HowItWorksBlock } from "./HowItWorks/config";
import { MadeInUSABlock } from "./MadeInUSA/config";
import { BulkOrdersBlock } from "./BulkOrders/config";
import { FAQBlock } from "./FAQ/config";
import { CTABlock } from "./CTA/config";
import type { Block } from "@/types/payload";

// Export block configs with lowercase names to match collection usage
export const heroBlock = HeroBlock;
export const featuresBlock = FeaturesBlock;
export const referralStripBlock = ReferralStripBlock;
export const howItWorksBlock = HowItWorksBlock;
export const madeInUSABlock = MadeInUSABlock;
export const bulkOrdersBlock = BulkOrdersBlock;
export const faqBlock = FAQBlock;
export const ctaBlock = CTABlock;
export const contentBlock: Block = {
	slug: "content",
	labels: {
		singular: "Content Block",
		plural: "Content Blocks",
	},
	fields: [
		{
			name: "content",
			type: "richText",
			required: true,
			label: "Content",
		},
	],
};

export const contactBlock: Block = {
	slug: "contact",
	labels: {
		singular: "Contact Block",
		plural: "Contact Blocks",
	},
	fields: [], // No fields needed as it's a static component
};

// Export block configs with original names
export { HeroBlock, FeaturesBlock, ReferralStripBlock, HowItWorksBlock, MadeInUSABlock, BulkOrdersBlock, FAQBlock, CTABlock };

// Default content
export { defaultHeroContent } from "./Hero/defaults";
export { defaultFeaturesContent } from "./Features/defaults";
export { defaultReferralStripContent } from "./ReferralStrip/defaults";
export { defaultHowItWorksContent } from "./HowItWorks/defaults";
export { defaultMadeInUSAContent } from "./MadeInUSA/defaults";
export { defaultBulkOrdersContent } from "./BulkOrders/defaults";
export { defaultFAQContent } from "./FAQ/defaults";
export { defaultCTAContent } from "./CTA/defaults";

// Block types
export const blocks = {
	hero: heroBlock,
	features: featuresBlock,
	referralStrip: referralStripBlock,
	howItWorks: howItWorksBlock,
	madeInUSA: madeInUSABlock,
	bullOrders: bulkOrdersBlock,
	faq: faqBlock,
	cta: ctaBlock,
	content: contentBlock,
	contact: contactBlock,
} as const;

// Re-export block type
export type { Block } from "@/types/payload";

// Update the Pages collection blocks array to include the contact block
export const pageBlocks = [heroBlock, contentBlock, featuresBlock, ctaBlock, referralStripBlock, howItWorksBlock, madeInUSABlock, bulkOrdersBlock, faqBlock, contactBlock];
