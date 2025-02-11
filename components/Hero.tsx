"use client";

import Image from "next/image";
import ShopifyCheckout from "./ShopifyCheckout";
import { Star } from "lucide-react";
import type React from "react";

export default function Hero() {
	return (
		<section className="hero-pattern" aria-labelledby="hero-heading">
			<div className="container px-4 py-6 mx-auto md:py-8">
				<div className="flex flex-col items-center md:flex-row">
					<div className="w-full mb-4 md:w-1/2 md:mb-0">
						<h1 id="hero-heading" className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-6xl md:mb-4">
							#1 All-in-One Mushroom Grow Bags
						</h1>
						<p className="mb-4 text-sm text-gray-300 sm:text-base md:text-lg md:mb-6">Premium 4 lbs grow bags with sterilized whole oat grain spawn and perfectly hydrated CVG substrate (Coco Coir, Vermiculite, Gypsum). Perfect for cultivating culinary, medicinal, magic, and gourmet mushroom varieties.</p>
						<div className="flex flex-wrap gap-2 mb-4">
							<span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-primary">Culinary</span>
							<span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-primary">Medicinal</span>
							<span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-primary">Magic</span>
							<span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-primary">Gourmet</span>
						</div>
						<div className="flex items-center mb-4">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-3 h-3 text-yellow-400 fill-current sm:w-4 sm:h-4 md:w-5 md:h-5" />
							))}
							<span className="ml-2 text-xs text-white sm:text-sm md:text-base">5.0 Stars</span>
						</div>
						<div className="w-full p-3 rounded-lg bg-secondary/50 backdrop-blur-sm md:p-4 md:max-w-md">
							<ShopifyCheckout />
						</div>
					</div>
					<div className="w-full md:w-1/2 md:pl-8">
						<figure className="relative">
							<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp" alt="ZugzBag All-in-One Mushroom Grow Bag" width={400} height={400} className="w-full rounded-lg" priority />
							<figcaption className="absolute px-2 py-1 text-xs font-semibold text-white rounded-full top-2 right-2 bg-purple">Bulk Savings on All-in-One Grow Bags</figcaption>
						</figure>
						<dl className="grid grid-cols-3 gap-2 mt-3 md:mt-4 md:gap-3">
							<div className="p-2 rounded-lg bg-secondary/50 backdrop-blur-sm md:p-3">
								<dt className="text-xs font-semibold text-center text-white md:text-sm">Grain Layer</dt>
								<dd className="text-xs text-center text-gray-400">Whole Oats</dd>
							</div>
							<div className="p-2 rounded-lg bg-secondary/50 backdrop-blur-sm md:p-3">
								<dt className="text-xs font-semibold text-center text-white md:text-sm">Substrate</dt>
								<dd className="text-xs text-center text-gray-400">CVG Blend</dd>
							</div>
							<div className="p-2 rounded-lg bg-secondary/50 backdrop-blur-sm md:p-3">
								<dt className="text-xs font-semibold text-center text-white md:text-sm">Sterile</dt>
								<dd className="text-xs text-center text-gray-400">Ready to Use</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</section>
	);
}
