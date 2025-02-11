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
			<section className="bg-secondary/50">
				<div className="container px-4 py-8 mx-auto sm:py-10 md:py-12 sm:px-6 md:px-8">
					<div className="text-center">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Learn More About All-in-One Grow Bags</h2>
						<p className="mb-6 text-base text-gray-300 sm:text-lg md:text-xl sm:mb-8">Discover why ZugzBag all-in-one grow bags are the top choice for mushroom cultivators.</p>
						<Link href="/all-in-one-grow-bags">
							<Button className="text-white bg-purple hover:bg-purple-dark">Explore All-in-One Grow Bags</Button>
						</Link>
					</div>
				</div>
			</section>

			<FAQ />
			<CTA />
		</div>
	);
}
