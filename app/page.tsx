import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import ReferralStrip from "@/components/ReferralStrip";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import MadeInUSA from "@/components/MadeInUSA";
import BulkOrders from "@/components/BulkOrders";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
	const features = [
		{
			title: "Lab-Grade Sterility",
			description: "Our bags are sterilized in an autoclave under precise conditions to ensure complete sterility and optimal growing conditions.",
		},
		{
			title: "Perfect Ratio",
			description: "Each bag contains the ideal ratio of grain to substrate, scientifically formulated for maximum yields.",
		},
		{
			title: "Filter Patch",
			description: "High-quality filter patches allow optimal gas exchange while maintaining sterility throughout the growing process.",
		},
		{
			title: "Fast Shipping",
			description: "Orders ship within 1-2 business days. Bulk orders may require additional processing time.",
		},
		{
			title: "Expert Support",
			description: "Our team of experienced growers is here to help you succeed with your cultivation projects.",
		},
		{
			title: "Bulk Savings",
			description: "Save up to 30% on bulk orders. Perfect for commercial growers and serious hobbyists.",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			<Hero />
			<ReferralStrip />
			<Features heading="Why Choose ZugzBag?" subheading="Premium quality, consistent results, and exceptional customer service." features={features} />
			<HowItWorks />
			<MadeInUSA />
			<BulkOrders />

			{/* New section for All-in-One Grow Bags */}
			<section className="bg-secondary/50">
				<div className="container px-4 py-8 mx-auto sm:py-10 md:py-12 sm:px-6 md:px-8">
					<div className="text-center">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Learn More About All-in-One Grow Bags</h2>
						<p className="mb-6 text-base text-gray-300 sm:text-lg md:text-xl sm:mb-8">Discover why ZugzBag all-in-one grow bags are the top choice for mushroom cultivators.</p>
						<Button asChild className="text-white bg-purple hover:bg-purple-dark">
							<Link href={{ pathname: "/all-in-one-grow-bags" }}>Explore All-in-One Grow Bags</Link>
						</Button>
					</div>
				</div>
			</section>

			<FAQ />
			<CTA />
		</div>
	);
}
