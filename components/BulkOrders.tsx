"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const bulkTiers = [
	{ quantity: 2, discount: 15 },
	{ quantity: 5, discount: 25 },
	{ quantity: 10, discount: 30 },
	{ quantity: 20, discount: 35 },
	{ quantity: 50, discount: 40 },
];

const BASE_PRICE = 29.99;
const PRODUCT_TITLE = "Sterile All-in-One Mushroom Grow Bag – 4 lbs Substrate & Grain with Filter Patch";

export default function BulkOrders() {
	const [loadingTier, setLoadingTier] = useState<number | null>(null);

	const handleBuyNow = async (quantity: number, discount: number) => {
		try {
			setLoadingTier(quantity);
			const price = BASE_PRICE * (1 - discount / 100);
			const finalPrice = price * quantity;
			const totalSavings = (BASE_PRICE * quantity - finalPrice).toFixed(2);

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
							price: BASE_PRICE,
							discountedPrice: price,
							properties: {
								_bulk_discount: `${discount}%`,
								_original_price: BASE_PRICE.toFixed(2),
								_discounted_price: price.toFixed(2),
								_total_savings: totalSavings,
								_product_title: PRODUCT_TITLE,
								_tier_level: `tier_${quantity}`,
								_discount_type: "bulk_tier",
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
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Failed to process your order. Please try again.",
				variant: "destructive",
			});
		} finally {
			setLoadingTier(null);
		}
	};

	return (
		<section className="container mx-auto py-12 px-4" id="bulk-orders" aria-labelledby="bulk-orders-heading">
			<h2 id="bulk-orders-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-white">
				Bulk Order Discounts
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
				{bulkTiers.map((tier) => (
					<Card key={tier.quantity} className="bg-secondary/50 backdrop-blur-sm border-purple/20 hover:border-purple/40 transition-colors card-hover">
						<CardHeader>
							<CardTitle className="text-xl md:text-2xl text-white text-center">{tier.quantity}+ Bags</CardTitle>
						</CardHeader>
						<CardContent className="text-center">
							<p className="text-2xl md:text-3xl font-bold text-purple mb-4">{tier.discount}% OFF</p>
							<Button className="bg-purple hover:bg-purple-dark text-white text-sm md:text-base w-full" onClick={() => handleBuyNow(tier.quantity, tier.discount)} disabled={loadingTier !== null}>
								{loadingTier === tier.quantity ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Processing...
									</>
								) : (
									<>
										<ShoppingCart className="w-4 h-4 mr-2" />
										Buy Now
									</>
								)}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
			<p className="text-center mt-6 md:mt-8 text-sm md:text-base text-gray-400">Bulk orders are perfect for commercial growers and cultivation enthusiasts. Contact us for custom quotes on orders over 100 bags.</p>
		</section>
	);
}
