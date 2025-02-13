"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const products = [
	{ name: "Oyster Mushroom Kit", image: "/placeholder.svg?height=300&width=300", price: "$29.99" },
	{ name: "Shiitake Mushroom Kit", image: "/placeholder.svg?height=300&width=300", price: "$34.99" },
	{ name: "Lion's Mane Mushroom Kit", image: "/placeholder.svg?height=300&width=300", price: "$39.99" },
];

export default function ProductShowcase() {
	const [currentProduct, setCurrentProduct] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { getCurrentPrice } = useCart();

	const nextProduct = () => {
		setCurrentProduct((prev) => (prev + 1) % products.length);
	};

	const prevProduct = () => {
		setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
	};

	const handleAddToCart = async () => {
		try {
			setIsLoading(true);
			const product = products[currentProduct];
			const price = getCurrentPrice(1); // Get current price for 1 item

			const response = await fetch("/api/cart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "add",
					items: [
						{
							quantity: 1,
							price: price,
							properties: {
								_product_title: product.name,
								_discount_type: "none",
							},
						},
					],
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to add to cart");
			}

			toast({
				title: "Success",
				description: `${product.name} added to cart`,
			});
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Failed to add to cart",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Premium Grow Kits</h2>
				<div className="flex items-center justify-between">
					<Button onClick={prevProduct} variant="outline" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<div className="text-center">
						<Image src={products[currentProduct].image || "/placeholder.svg"} alt={products[currentProduct].name} width={300} height={300} className="mx-auto mb-4 rounded-lg shadow-md" />
						<h3 className="text-2xl font-semibold mb-2">{products[currentProduct].name}</h3>
						<p className="text-xl text-teal-600 font-bold mb-4">{products[currentProduct].price}</p>
						<Button className="bg-teal-500 text-white hover:bg-teal-600" onClick={handleAddToCart} disabled={isLoading}>
							{isLoading ? "Adding..." : "Add to Cart"}
						</Button>
					</div>
					<Button onClick={nextProduct} variant="outline" size="icon">
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}

