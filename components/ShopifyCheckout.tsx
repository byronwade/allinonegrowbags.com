"use client";

import { Button } from "@/components/ui/button";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const BASE_PRICE = 29.99;
const PRODUCT_TITLE = "Sterile All-in-One Mushroom Grow Bag – 4 lbs Substrate & Grain with Filter Patch";

export default function ShopifyCheckout() {
	const { quantity, getCurrentPrice, getDiscount } = useCart();
	const [isLoading, setIsLoading] = useState(false);

	const handleBuyNow = async () => {
		try {
			setIsLoading(true);
			const price = getCurrentPrice(quantity);
			const finalPrice = price * quantity;
			const discount = getDiscount(quantity);
			const totalSavings = discount > 0 ? (BASE_PRICE * quantity - finalPrice).toFixed(2) : "0";

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
							price: BASE_PRICE, // Original price
							discountedPrice: price, // Price after tier discount
							properties: {
								_bulk_discount: discount > 0 ? `${(discount * 100).toFixed(0)}%` : "None",
								_original_price: BASE_PRICE.toFixed(2),
								_discounted_price: price.toFixed(2),
								_total_savings: totalSavings,
								_product_title: PRODUCT_TITLE,
								_tier_level: getTierLevel(quantity),
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
			setIsLoading(false);
		}
	};

	// Helper function to determine tier level based on quantity
	const getTierLevel = (qty: number) => {
		if (qty >= 50) return "tier_4";
		if (qty >= 20) return "tier_3";
		if (qty >= 10) return "tier_2";
		if (qty >= 5) return "tier_1";
		return "base";
	};

	const price = getCurrentPrice(quantity);
	const totalPrice = price * quantity;
	const discount = getDiscount(quantity);
	const savings = discount > 0 ? BASE_PRICE * quantity - totalPrice : 0;

	return (
		<div className="space-y-4" suppressHydrationWarning>
			<div className="flex items-center justify-between">
				<span className="text-lg font-medium text-white">Quantity:</span>
				<QuantitySelector min={1} max={1000} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between items-center">
					<span className="text-gray-300">Price per bag:</span>
					<div className="text-right">
						<span className="font-semibold text-white">${price.toFixed(2)}</span>
						{discount > 0 && (
							<>
								<span className="ml-2 text-sm font-semibold text-green-400">({(discount * 100).toFixed(0)}% off)</span>
								<div className="text-xs text-gray-400">
									<s>${BASE_PRICE.toFixed(2)}</s> original price
								</div>
							</>
						)}
					</div>
				</div>
				<div className="flex justify-between items-center border-t border-gray-700 pt-2">
					<span className="text-gray-300">Total:</span>
					<div className="text-right">
						<span className="font-semibold text-white">${totalPrice.toFixed(2)}</span>
						{savings > 0 && <span className="ml-2 text-sm font-semibold text-green-400">(Save ${savings.toFixed(2)})</span>}
					</div>
				</div>
			</div>
			<Button className="w-full bg-purple hover:bg-purple-dark text-white py-6 text-lg font-semibold" onClick={handleBuyNow} disabled={isLoading}>
				{isLoading ? "Adding to Cart..." : `Buy Now - $${totalPrice.toFixed(2)}`}
			</Button>
			<p className="text-sm text-gray-400 text-center">Free shipping on all orders! Bulk discounts applied automatically.</p>
		</div>
	);
}
