import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const bulkTiers = [
	{ quantity: 2, discount: 15 },
	{ quantity: 5, discount: 25 },
	{ quantity: 10, discount: 30 },
	{ quantity: 20, discount: 35 },
	{ quantity: 50, discount: 40 },
];

export default function BulkOrders() {
	return (
		<section className="py-12 px-4 bg-background" id="bulk-orders" aria-labelledby="bulk-orders-heading">
			<div className="container mx-auto">
				<h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">Bulk Order Discounts</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{bulkTiers.map((tier, index) => (
						<Card key={index} className="bg-secondary/50 backdrop-blur-sm border-purple/20 hover:border-purple/40 transition-colors card-hover">
							<CardHeader>
								<CardTitle className="text-2xl text-white text-center">{tier.quantity}+ Bags</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-3xl font-bold text-purple mb-4">{tier.discount}% OFF</p>
								<Button className="bg-purple hover:bg-purple-dark text-white">
									<ShoppingCart className="w-4 h-4 mr-2" />
									Order Now
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
				<p className="text-center mt-8 text-gray-400">Bulk orders are perfect for commercial growers and cultivation enthusiasts. Contact us for custom quotes on orders over 100 bags.</p>
			</div>
		</section>
	);
}
