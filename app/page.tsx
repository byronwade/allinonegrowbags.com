import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import ReferralStrip from "@/components/ReferralStrip";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import BulkOrders from "@/components/BulkOrders";
import CTA from "@/components/CTA";
import MadeInUSA from "@/components/MadeInUSA";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<Hero />
			<ReferralStrip />
			<Features />
			<HowItWorks />
			<MadeInUSA />
			<BulkOrders />

			{/* New section for All-in-One Grow Bags */}
			<section className="container mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 bg-secondary/50">
				<div className="text-center">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Learn More About All-in-One Grow Bags</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">Discover why ZugzBag all-in-one grow bags are the top choice for mushroom cultivators.</p>
					<Link href="/all-in-one-grow-bags">
						<Button className="bg-purple hover:bg-purple-dark text-white">Explore All-in-One Grow Bags</Button>
					</Link>
				</div>
			</section>

			<FAQ />
			<CTA />
		</div>
	);
}
