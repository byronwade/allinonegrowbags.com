import ContactForm from "./ContactForm";
import { Hero } from "@/blocks/Hero/Hero";
import { Features } from "@/blocks/Features/Features";
import { ReferralStrip } from "@/blocks/ReferralStrip/ReferralStrip";
import { HowItWorks } from "@/blocks/HowItWorks/HowItWorks";
import { MadeInUSA } from "@/blocks/MadeInUSA/MadeInUSA";
import { BulkOrders } from "@/blocks/BulkOrders/BulkOrders";
import { FAQ } from "@/blocks/FAQ/FAQ";
import CTA from "@/blocks/CTA/CTA";

interface BaseBlock {
	id?: string;
	blockName?: string;
}

interface ContentBlock extends BaseBlock {
	blockType: "content";
	content: string;
}

interface HeroBlock extends BaseBlock {
	blockType: "hero";
	heading: string;
	description: string;
	mushroomTypes: { type: string }[];
	image: {
		url: string;
		alt: string;
	};
	specs: {
		label: string;
		value: string;
	}[];
}

interface Feature {
	title: string;
	description: string;
	icon: "microscope" | "scale" | "filter" | "truck" | "heartHandshake" | "percent";
	id?: string;
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

interface Step {
	title: string;
	description: string;
	id?: string;
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
	benefits: Array<{ text: string }>;
	image: {
		url: string;
		alt: string;
	};
	flagImage: {
		url: string;
		alt: string;
	};
}

interface BulkTier {
	quantity: number;
	discount: number;
	id?: string;
}

interface BulkOrdersBlock extends BaseBlock {
	blockType: "bulkOrders";
	heading: string;
	description: string;
	tiers: BulkTier[];
	footerText: string;
}

interface FAQBlock extends BaseBlock {
	blockType: "faq";
	heading: string;
	description: string;
	faqs: {
		question: string;
		answer: string;
		id?: string;
	}[];
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

interface ContactBlock extends BaseBlock {
	blockType: "contact";
}

export type BlockType = "hero" | "content" | "features" | "referralStrip" | "howItWorks" | "madeInUSA" | "bulkOrders" | "faq" | "cta" | "contact";

export type PageBlock = HeroBlock | ContentBlock | FeaturesBlock | ReferralStripBlock | HowItWorksBlock | MadeInUSABlock | BulkOrdersBlock | FAQBlock | CTABlock | ContactBlock;

interface BlockRendererProps {
	blocks: PageBlock[];
}

function isPageBlock(block: unknown): block is PageBlock {
	return typeof block === "object" && block !== null && "blockType" in block && typeof (block as { blockType: unknown }).blockType === "string";
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
	if (!Array.isArray(blocks)) {
		console.warn("Invalid blocks prop:", blocks);
		return null;
	}

	return (
		<>
			{blocks.map((block, index) => {
				if (!isPageBlock(block)) {
					console.warn("Invalid block:", block);
					return null;
				}

				const blockType = block.blockType as BlockType;
				switch (blockType) {
					case "content": {
						const contentBlock = block as ContentBlock;
						if (!contentBlock.content) return null;
						return (
							<div key={index} className="prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-200">
								<div dangerouslySetInnerHTML={{ __html: contentBlock.content }} />
							</div>
						);
					}
					case "hero": {
						const heroBlock = block as HeroBlock;
						return <Hero key={heroBlock.id || index} heading={heroBlock.heading} description={heroBlock.description} mushroomTypes={heroBlock.mushroomTypes.map((mt) => mt.type)} image={heroBlock.image} specs={heroBlock.specs} />;
					}
					case "features": {
						const featuresBlock = block as FeaturesBlock;
						return <Features key={featuresBlock.id || index} heading={featuresBlock.heading} subheading={featuresBlock.subheading} features={featuresBlock.features} />;
					}
					case "referralStrip": {
						const referralStripBlock = block as ReferralStripBlock;
						return <ReferralStrip key={referralStripBlock.id || index} text={referralStripBlock.text} link={referralStripBlock.link} />;
					}
					case "howItWorks": {
						const howItWorksBlock = block as HowItWorksBlock;
						return <HowItWorks key={howItWorksBlock.id || index} heading={howItWorksBlock.heading} steps={howItWorksBlock.steps} image={howItWorksBlock.image} />;
					}
					case "madeInUSA": {
						const madeInUSABlock = block as MadeInUSABlock;
						return <MadeInUSA key={madeInUSABlock.id || index} heading={madeInUSABlock.heading} description={madeInUSABlock.description} benefits={madeInUSABlock.benefits} image={madeInUSABlock.image} flagImage={madeInUSABlock.flagImage} />;
					}
					case "bulkOrders": {
						const bulkOrdersBlock = block as BulkOrdersBlock;
						return <BulkOrders key={bulkOrdersBlock.id || index} heading={bulkOrdersBlock.heading} description={bulkOrdersBlock.description} tiers={bulkOrdersBlock.tiers} footerText={bulkOrdersBlock.footerText} />;
					}
					case "faq": {
						const faqBlock = block as FAQBlock;
						if (!faqBlock.heading || !faqBlock.description || !Array.isArray(faqBlock.faqs)) {
							console.warn("Invalid FAQ block data:", faqBlock);
							return null;
						}
						return <FAQ key={faqBlock.id || index} heading={faqBlock.heading} description={faqBlock.description} faqs={faqBlock.faqs} />;
					}
					case "cta": {
						return <CTA key={block.id || index} />;
					}
					case "contact": {
						const contactBlock = block as ContactBlock;
						return <ContactForm key={contactBlock.id || index} />;
					}
					default:
						console.warn("Unknown block type:", blockType);
						return null;
				}
			})}
		</>
	);
}
