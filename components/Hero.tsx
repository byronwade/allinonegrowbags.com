"use client";

import Image from "next/image";
import ShopifyCheckout from "./ShopifyCheckout";
import { Star } from "lucide-react";
import type React from "react";

export default function Hero() {
	return (
		<section className="container mx-auto py-6 md:py-8 px-4 hero-pattern" aria-labelledby="hero-heading">
			<div className="flex flex-col md:flex-row items-center">
				<div className="w-full md:w-1/2 mb-4 md:mb-0">
					<h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 text-white leading-tight">
						#1 All-in-One Mushroom Grow Bags
					</h1>
					<p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-300">Premium 4 lbs grow bags with sterilized whole oat grain spawn and perfectly hydrated CVG substrate (Coco Coir, Vermiculite, Gypsum). Ideal for gourmet mushrooms like oyster, shiitake, and lion&apos;s mane.</p>
					<div className="grid grid-cols-2 gap-3 mb-4">
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
							<span className="text-xs sm:text-sm text-gray-300">Sterilized & Ready</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
							<span className="text-xs sm:text-sm text-gray-300">Filter Patch</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
							<span className="text-xs sm:text-sm text-gray-300">Injection Port</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
							<span className="text-xs sm:text-sm text-gray-300">4 lbs Total</span>
						</div>
					</div>
					<div className="flex items-center mb-4">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
						))}
						<span className="ml-2 text-xs sm:text-sm md:text-base text-white">5.0 Stars</span>
					</div>
					<div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-3 md:p-4 w-full md:max-w-md">
						<ShopifyCheckout />
					</div>
				</div>
				<div className="w-full md:w-1/2 md:pl-8">
					<figure className="relative">
						<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp" alt="ZugzBag All-in-One Mushroom Grow Bag" width={400} height={400} className="rounded-lg w-full" priority />
						<figcaption className="absolute top-2 right-2 bg-purple text-white px-2 py-1 rounded-full text-xs font-semibold">Bulk Savings on All-in-One Grow Bags</figcaption>
					</figure>
					<dl className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3">
						<div className="bg-secondary/50 backdrop-blur-sm p-2 md:p-3 rounded-lg">
							<dt className="font-semibold text-center text-white text-xs md:text-sm">Grain Layer</dt>
							<dd className="text-xs text-gray-400 text-center">Whole Oats</dd>
						</div>
						<div className="bg-secondary/50 backdrop-blur-sm p-2 md:p-3 rounded-lg">
							<dt className="font-semibold text-center text-white text-xs md:text-sm">Substrate</dt>
							<dd className="text-xs text-gray-400 text-center">CVG Blend</dd>
						</div>
						<div className="bg-secondary/50 backdrop-blur-sm p-2 md:p-3 rounded-lg">
							<dt className="font-semibold text-center text-white text-xs md:text-sm">Sterile</dt>
							<dd className="text-xs text-gray-400 text-center">Ready to Use</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
