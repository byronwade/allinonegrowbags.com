"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react";
import { getProductPricing } from "@/lib/shopify";

interface CartContextType {
	quantity: number;
	setQuantity: (quantity: number) => void;
	getCurrentPrice: (quantity: number) => number;
	getDiscount: (quantity: number) => number;
	basePrice: number;
	compareAtPrice: number | null;
	isLoading: boolean;
}

const discountTiers = [
	{ minQuantity: 50, discount: 0.4 }, // 40% off
	{ minQuantity: 20, discount: 0.35 }, // 35% off
	{ minQuantity: 10, discount: 0.3 }, // 30% off
	{ minQuantity: 5, discount: 0.25 }, // 25% off
	{ minQuantity: 2, discount: 0.15 }, // 15% off
];

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [quantity, setQuantity] = useState(1);
	const [basePrice, setBasePrice] = useState(24.95);
	const [compareAtPrice, setCompareAtPrice] = useState<number | null>(29.99);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPricing = async () => {
			try {
				setIsLoading(true);
				const pricing = await getProductPricing();
				if (pricing && typeof pricing.price === "number" && !isNaN(pricing.price)) {
					setBasePrice(pricing.price);
					setCompareAtPrice(pricing.compareAtPrice);
				}
			} catch (error) {
				console.error("Error fetching pricing:", error);
				// Keep default values on error
			} finally {
				setIsLoading(false);
			}
		};
		fetchPricing();
	}, []);

	const getDiscount = (qty: number): number => {
		const tier = discountTiers.find((tier) => qty >= tier.minQuantity);
		return tier ? tier.discount : 0;
	};

	const getCurrentPrice = (qty: number): number => {
		if (isLoading || isNaN(basePrice)) return 24.95; // Return default price while loading
		const discount = getDiscount(qty);
		return basePrice * (1 - discount);
	};

	return (
		<CartContext.Provider
			value={{
				quantity,
				setQuantity,
				getCurrentPrice,
				getDiscount,
				basePrice,
				compareAtPrice,
				isLoading,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}

