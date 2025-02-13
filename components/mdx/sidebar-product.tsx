"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import QuantitySelector from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const PRODUCT_TITLE = "Sterile All-in-One Mushroom Grow Bag – 4 lbs Substrate & Grain with Filter Patch";

export function SidebarProduct() {
	const [isLoading, setIsLoading] = useState(false);
	const { quantity, getCurrentPrice, getDiscount } = useCart();
	const price = getCurrentPrice(quantity);
	const totalPrice = price * quantity;
	const discount = getDiscount(quantity);

	const handleBuyNow = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/cart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "add",
					items: [
						{
							quantity: quantity,
							price: price,
							properties: {
								_product_title: PRODUCT_TITLE,
								_discount_type: discount > 0 ? "bulk_tier" : "none",
								_bulk_discount: discount > 0 ? `${(discount * 100).toFixed(0)}%` : "None",
								_original_price: price.toFixed(2),
								_total_savings: (discount * price * quantity).toFixed(2),
							},
						},
					],
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to add to cart");
			}

			// Redirect to checkout
			window.location.href = data.checkoutUrl;

			toast({
				title: "Success",
				description: `Added ${quantity} bag${quantity > 1 ? "s" : ""} to cart`,
			});
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Failed to process your order",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

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

				<div className="space-y-4" suppressHydrationWarning>
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-300">Quantity:</span>
						<QuantitySelector min={1} max={1000} />
					</div>

					<div className="flex items-center justify-between">
						<div>
							<span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
							{discount > 0 && <div className="text-sm text-green-400">Save {(discount * 100).toFixed(0)}%</div>}
						</div>
						<Button className="bg-purple hover:bg-purple-dark text-white" onClick={handleBuyNow} disabled={isLoading}>
							<ShoppingCart className="w-4 h-4 mr-2" />
							{isLoading ? "Processing..." : "Buy Now"}
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
