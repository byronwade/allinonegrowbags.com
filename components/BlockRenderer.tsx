import ContactForm from "./ContactForm";
import { lexicalRichTextToReact } from "@/lib/lexical";
import { Hero } from "@/blocks/Hero/Hero";
import { Features } from "@/blocks/Features/Features";
import { ReferralStrip } from "@/blocks/ReferralStrip/ReferralStrip";
import { HowItWorks } from "@/blocks/HowItWorks/HowItWorks";
import { MadeInUSA } from "@/blocks/MadeInUSA/MadeInUSA";
import { BulkOrders } from "@/blocks/BulkOrders/BulkOrders";
import { FAQ } from "@/blocks/FAQ/FAQ";
import { CTA } from "@/blocks/CTA/CTA";
import type { Route } from "next";

type LexicalNode = {
	type: string;
	version: number;
	format?: string;
	style?: string;
	text?: string;
	tag?: number;
	listType?: string;
	url?: string;
	target?: string;
};

interface MushroomType {
	type: string;
	id?: string;
}

interface Spec {
	label: string;
	value: string;
	id?: string;
}

interface Feature {
	title: string;
	description: string;
	icon?: string;
	id?: string;
}

interface Step {
	title: string;
	description: string;
	id?: string;
}

interface Tier {
	quantity: number;
	discount: number;
	id?: string;
}

interface FAQItem {
	question: string;
	answer: string;
	id?: string;
}

interface Media {
	url: string;
	alt: string;
	id?: number;
}

interface BaseBlock {
	id?: string;
	blockName?: string;
}

interface HeroBlock extends BaseBlock {
	blockType: "hero";
	heading: string;
	description: string;
	mushroomTypes: MushroomType[];
	image: Media;
	specs: Spec[];
}

interface FeaturesBlock extends BaseBlock {
	blockType: "features";
	heading: string;
	subheading: string;
	features: Feature[];
}

interface ReferralStripBlock extends BaseBlock {
	blockType: "referralStrip";
	text: string;
	link: {
		text: string;
		url: string;
	};
}

interface HowItWorksBlock extends BaseBlock {
	blockType: "howItWorks";
	heading: string;
	steps: Step[];
	image: {
		url: string;
		alt: string;
	};
}

interface MadeInUSABlock extends BaseBlock {
	blockType: "madeInUSA";
	heading: string;
	description: string;
	benefits: string[];
	image: Media;
	flagImage: Media;
}

interface BulkOrdersBlock extends BaseBlock {
	blockType: "bulkOrders";
	heading: string;
	description: string;
	tiers: Tier[];
	footerText: string;
}

interface FAQBlock extends BaseBlock {
	blockType: "faq";
	heading: string;
	description: string;
	faqs: FAQItem[];
}

interface CTABlock extends BaseBlock {
	blockType: "cta";
	heading: string;
	description: string;
	primaryButtonText: string;
	primaryButtonLink: string;
	secondaryButtonText?: string;
	secondaryButtonLink?: string;
}

interface ContentBlock extends BaseBlock {
	blockType: "content";
	content: {
		root: LexicalNode;
	};
}

interface ContactBlock extends BaseBlock {
	blockType: "contact";
}

export type Block = HeroBlock | FeaturesBlock | ReferralStripBlock | HowItWorksBlock | MadeInUSABlock | BulkOrdersBlock | FAQBlock | CTABlock | ContentBlock | ContactBlock;

interface BlockRendererProps {
	blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
	console.log("Rendering blocks:", blocks);

	if (!blocks) return null;

	return (
		<div className="space-y-12">
			{blocks.map((block, index) => {
				console.log("Processing block:", block.blockType);

				switch (block.blockType) {
					case "hero":
						return <Hero key={block.id || index} heading={block.heading} description={block.description} mushroomTypes={block.mushroomTypes.map((mt) => mt.type)} image={block.image} specs={block.specs} />;
					case "features":
						return <Features key={block.id || index} heading={block.heading} subheading={block.subheading} features={block.features} />;
					case "referralStrip":
						return <ReferralStrip key={block.id || index} text={block.text} link={block.link} />;
					case "howItWorks":
						return <HowItWorks key={block.id || index} heading={block.heading} steps={block.steps} image={block.image} />;
					case "madeInUSA":
						return <MadeInUSA key={block.id || index} heading={block.heading} description={block.description} benefits={block.benefits} image={block.image} flagImage={block.flagImage} />;
					case "bulkOrders":
						return <BulkOrders key={block.id || index} heading={block.heading} description={block.description} tiers={block.tiers} footerText={block.footerText} />;
					case "faq":
						return <FAQ key={block.id || index} heading={block.heading} description={block.description} faqs={block.faqs} />;
					case "cta":
						return <CTA key={block.id || index} heading={block.heading} description={block.description} primaryButtonText={block.primaryButtonText} primaryButtonLink={`/${block.primaryButtonLink}` as Route} secondaryButtonText={block.secondaryButtonText} secondaryButtonLink={block.secondaryButtonLink ? (`/${block.secondaryButtonLink}` as Route) : undefined} />;
					case "content":
						if (block.content) {
							return (
								<div key={block.id || index} className="prose prose-invert max-w-none">
									{lexicalRichTextToReact(block.content)}
								</div>
							);
						}
						return null;
					case "contact":
						return <ContactForm key={block.id || index} />;
					default:
						console.warn("Unknown block type:", block.blockType);
						return null;
				}
			})}
		</div>
	);
}
