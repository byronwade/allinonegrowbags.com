"use client";

import Image from "next/image";
import ShopifyCheckout from "./ShopifyCheckout";
import { Star } from "lucide-react";
import type React from "react";

export default function Hero() {
	return (
		<section className="hero-pattern py-12 md:py-20 px-4" aria-labelledby="hero-heading">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row items-center">
					<div className="w-full md:w-1/2 mb-8 md:mb-0">
						<h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
							#1 All-in-One Mushroom Grow Bags
						</h1>
						<p className="text-lg md:text-xl mb-8 text-gray-300">ZugzBag offers premium, sterile all-in-one grow bags with 4 lbs of substrate. Ideal for gourmet mushrooms like oyster, shiitake, and lion's mane. Perfect for commercial growers and hobbyists. Save up to 30% on bulk orders!</p>
						<div className="flex items-center mb-6">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
							))}
							<span className="ml-2 text-white">5.0 Stars</span>
						</div>
						<div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-4 md:p-6 w-full md:max-w-md">
							<ShopifyCheckout />
						</div>
					</div>
					<div className="w-full md:w-1/2 md:pl-12">
						<figure className="relative">
							<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp" alt="ZugzBag All-in-One Mushroom Grow Bag" width={500} height={500} className="rounded-lg w-full" priority />
							<figcaption className="absolute top-4 right-4 bg-purple text-white px-4 py-2 rounded-full text-sm font-semibold">Bulk Savings on All-in-One Grow Bags</figcaption>
						</figure>
						<dl className="mt-6 grid grid-cols-3 gap-4">
							<div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg">
								<dt className="font-semibold text-center text-white">4 lbs Total</dt>
								<dd className="text-sm text-gray-400 text-center">Premium Substrate</dd>
							</div>
							<div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg">
								<dt className="font-semibold text-center text-white">Filter Patch</dt>
								<dd className="text-sm text-gray-400 text-center">For Air Exchange</dd>
							</div>
							<div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg">
								<dt className="font-semibold text-center text-white">Sterile</dt>
								<dd className="text-sm text-gray-400 text-center">Ready to Use</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</section>
	);
}
