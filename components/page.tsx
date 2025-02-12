import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/blocks/Hero/Hero";
import { ReferralStrip } from "@/blocks/ReferralStrip/ReferralStrip";
import { Features } from "@/blocks/Features/Features";
import { HowItWorks } from "@/blocks/HowItWorks/HowItWorks";
import { MadeInUSA } from "@/blocks/MadeInUSA/MadeInUSA";
import { defaultHeroContent } from "@/blocks/Hero/defaults";
import { defaultFeaturesContent } from "@/blocks/Features/defaults";
import { defaultReferralStripContent } from "@/blocks/ReferralStrip/defaults";
import { defaultHowItWorksContent } from "@/blocks/HowItWorks/defaults";
import { defaultMadeInUSAContent } from "@/blocks/MadeInUSA/defaults";
import BulkOrders from "@/components/BulkOrders";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

const allInOneGrowBagsPath = "/all-in-one-grow-bags" as const;

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<Hero {...defaultHeroContent} />
			<ReferralStrip {...defaultReferralStripContent} />
			<Features {...defaultFeaturesContent} />
			<HowItWorks {...defaultHowItWorksContent} />
			<MadeInUSA {...defaultMadeInUSAContent} />
			<BulkOrders />

			{/* New section for All-in-One Grow Bags */}
			<section className="bg-secondary/50">
				<div className="container px-4 py-8 mx-auto sm:py-10 md:py-12 sm:px-6 md:px-8">
					<div className="text-center">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Learn More About All-in-One Grow Bags</h2>
						<p className="mb-6 text-base text-gray-300 sm:text-lg md:text-xl sm:mb-8">Discover why ZugzBag all-in-one grow bags are the top choice for mushroom cultivators.</p>
						<Button asChild className="text-white bg-purple hover:bg-purple-dark">
							<Link href={allInOneGrowBagsPath}>Explore All-in-One Grow Bags</Link>
						</Button>
					</div>
				</div>
			</section>

			<FAQ />
			<CTA />
		</div>
	);
}
