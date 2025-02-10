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
		<main className="min-h-screen bg-background">
			<Hero />
			<ReferralStrip />
			<Features />
			<HowItWorks />
			<MadeInUSA />
			<BulkOrders />

			{/* New section for All-in-One Grow Bags */}
			<section className="py-12 px-4 bg-secondary/50">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-bold mb-6 text-white">Learn More About All-in-One Grow Bags</h2>
					<p className="text-xl text-gray-300 mb-8">Discover why ZugzBag all-in-one grow bags are the top choice for mushroom cultivators.</p>
					<Link href="/all-in-one-grow-bags">
						<Button className="bg-purple hover:bg-purple-dark text-white">Explore All-in-One Grow Bags</Button>
					</Link>
				</div>
			</section>

			<FAQ />
			<CTA />
		</main>
	);
}
