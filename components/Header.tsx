"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Route } from "next";

const VARIANT_ID = "7264768655420";

interface NavLink {
	label: string;
	href: Route;
	isScroll?: boolean;
}

const navLinks: NavLink[] = [
	{ label: "Learn", href: "/learn" as Route },
	{ label: "Guides", href: "/guides" as Route },
	{ label: "Contact", href: "/contact" as Route },
];

export default function Header() {
	const { quantity, getCurrentPrice, getDiscount, basePrice } = useCart();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Handle hash navigation when page loads
		if (window.location.hash) {
			const id = window.location.hash.replace("#", "");
			const element = document.getElementById(id);
			if (element) {
				setTimeout(() => {
					element.scrollIntoView({ behavior: "smooth" });
				}, 100);
			}
		}
	}, [pathname]);

	const handleNavClick = async (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
		e.preventDefault();
		setMobileMenuOpen(false);

		if (link.isScroll) {
			const id = link.href.split("#")[1];
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			await router.push(link.href);
		}
	};

	const handleBuyNow = async () => {
		try {
			setIsLoading(true);
			const price = getCurrentPrice(quantity);
			const finalPrice = price * quantity;
			const discount = getDiscount(quantity);
			const totalSavings = discount > 0 ? (basePrice * quantity - finalPrice).toFixed(2) : "0";

			const response = await fetch("/api/cart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "add",
					items: [
						{
							id: VARIANT_ID,
							quantity: quantity,
							properties: {
								_bulk_discount: discount > 0 ? `${(discount * 100).toFixed(0)}%` : "None",
								_original_price: basePrice.toFixed(2),
								_discounted_price: price.toFixed(2),
								_total_savings: totalSavings,
							},
						},
					],
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add to cart");
			}

			const { checkoutUrl } = await response.json();
			window.location.href = checkoutUrl;
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const price = getCurrentPrice(quantity);
	const totalPrice = price * quantity;
	const discount = getDiscount(quantity);

	return (
		<header className="bg-background border-b border-border sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<Link href="/" className="flex items-center">
						<span className="font-bold text-xl text-white">ZugzBag</span>
					</Link>

					<div className="hidden md:flex items-center justify-between flex-grow ml-4">
						<nav className="flex items-center space-x-6">
							{navLinks.map((link) => (
								<Link key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-purple transition-colors" onClick={(e) => handleNavClick(e, link)}>
									{link.label}
								</Link>
							))}
						</nav>
						<div className="flex items-center space-x-4" suppressHydrationWarning>
							<div className="flex items-center space-x-2">
								<span className="text-sm text-gray-300">Quantity:</span>
								<QuantitySelector min={1} max={1000} />
							</div>
							<div className="flex items-center space-x-2">
								<div className="text-right">
									<span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
									{discount > 0 && <p className="text-xs text-green-400">{(discount * 100).toFixed(0)}% off</p>}
								</div>
								<Button onClick={handleBuyNow} className="bg-purple hover:bg-purple-dark text-white" disabled={isLoading}>
									<ShoppingCart className="w-4 h-4 mr-2" />
									{isLoading ? "Adding..." : "Buy Now"}
								</Button>
							</div>
						</div>
					</div>

					<div className="md:hidden">
						<Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							{mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-background border-t border-border">
					<div className="container mx-auto px-4 py-4 space-y-4">
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} className="block text-sm text-gray-300 hover:text-purple transition-colors" onClick={(e) => handleNavClick(e, link)}>
								{link.label}
							</Link>
						))}
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-300">Quantity:</span>
							<QuantitySelector min={1} max={1000} />
						</div>
						<div className="flex items-center justify-between">
							<div className="text-left">
								<span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
								{discount > 0 && <p className="text-xs text-green-400">{(discount * 100).toFixed(0)}% off</p>}
							</div>
							<Button onClick={handleBuyNow} className="bg-purple hover:bg-purple-dark text-white" disabled={isLoading}>
								<ShoppingCart className="w-4 h-4 mr-2" />
								{isLoading ? "Adding..." : "Buy Now"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
