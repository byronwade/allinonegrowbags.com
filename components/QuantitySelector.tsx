"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import type React from "react";

interface QuantitySelectorProps {
	min?: number;
	max?: number;
}

export default function QuantitySelector({ min = 1, max = 100 }: QuantitySelectorProps) {
	const { quantity, setQuantity } = useCart();

	const updateQuantity = (newQuantity: number) => {
		const validQuantity = Math.max(min, Math.min(max, newQuantity));
		setQuantity(validQuantity);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value) || min;
		updateQuantity(value);
	};

	return (
		<div className="flex items-center space-x-2">
			<Button variant="outline" size="icon" onClick={() => updateQuantity(quantity - 1)} disabled={quantity <= min}>
				<Minus className="h-4 w-4" />
			</Button>
			<Input type="number" min={min} max={max} value={quantity} onChange={handleInputChange} className="w-20 text-center" suppressHydrationWarning />
			<Button variant="outline" size="icon" onClick={() => updateQuantity(quantity + 1)} disabled={quantity >= max}>
				<Plus className="h-4 w-4" />
			</Button>
		</div>
	);
}
