"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import QuantitySelector from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";

export function SidebarProduct() {
	const { quantity, getCurrentPrice, getDiscount } = useCart();
	const price = getCurrentPrice(quantity);
	const totalPrice = price * quantity;
	const discount = getDiscount(quantity);

	return (
		<div className="sticky top-24 w-full bg-secondary/50 backdrop-blur-sm border border-purple/20 rounded-lg overflow-hidden">
			{/* Product Image */}
			<div className="relative w-full aspect-[4/3]">
				<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp" alt="All-in-One Grow Bag" fill className="object-cover" priority />
			</div>

			<div className="p-6 space-y-6">
				<div className="space-y-2">
					<h3 className="text-xl font-semibold text-white">All-in-One Grow Bag</h3>
					<p className="text-sm text-gray-300">Complete substrate solution for mushroom cultivation</p>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-300">Quantity:</span>
						<QuantitySelector min={1} max={1000} />
					</div>

					<div className="flex items-center justify-between">
						<div>
							<span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
							{discount > 0 && <div className="text-sm text-green-400">Save {(discount * 100).toFixed(0)}%</div>}
						</div>
						<Button className="bg-purple hover:bg-purple-dark text-white">
							<ShoppingCart className="w-4 h-4 mr-2" />
							Buy Now
						</Button>
					</div>
				</div>

				<div className="space-y-2 border-t border-purple/20 pt-4">
					<div className="flex items-center text-sm text-gray-300">
						<span className="font-medium">✓</span>
						<span className="ml-2">Pre-sterilized & ready to use</span>
					</div>
					<div className="flex items-center text-sm text-gray-300">
						<span className="font-medium">✓</span>
						<span className="ml-2">Perfect substrate ratio</span>
					</div>
					<div className="flex items-center text-sm text-gray-300">
						<span className="font-medium">✓</span>
						<span className="ml-2">High-quality filter patch</span>
					</div>
					<div className="flex items-center text-sm text-gray-300">
						<span className="font-medium">✓</span>
						<span className="ml-2">Fast shipping</span>
					</div>
				</div>
			</div>
		</div>
	);
}
