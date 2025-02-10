import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Sprout, BookOpen, Recycle, Clock, Award, DollarSign, Leaf } from "lucide-react";

const features = [
	{
		title: "Premium All-in-One Substrate",
		description: "Pre-sterilized organic blend for optimal mushroom growth",
		icon: Beaker,
	},
	{
		title: "High-Quality Spawn",
		description: "Carefully selected for best results in our all-in-one bags",
		icon: Sprout,
	},
	{
		title: "Expert Guidance",
		description: "Step-by-step instructions for foolproof mushroom growing",
		icon: BookOpen,
	},
	{
		title: "Eco-Friendly",
		description: "Sustainable all-in-one grow bags with recyclable materials",
		icon: Leaf,
	},
	{
		title: "Quick Results",
		description: "Harvest mushrooms in as little as 2-3 weeks",
		icon: Clock,
	},
	{
		title: "Gourmet Quality",
		description: "Grow restaurant-grade mushrooms at home with our all-in-one bags",
		icon: Award,
	},
	{
		title: "Bulk Discounts",
		description: "Save more when you order multiple all-in-one grow bags",
		icon: DollarSign,
	},
	{
		title: "Guaranteed Growth",
		description: "Free replacement if your mushrooms don't grow in our all-in-one bags",
		icon: Recycle,
	},
];

export default function Features() {
	return (
		<section className="py-12 px-4 bg-background" id="features" aria-labelledby="features-heading">
			<div className="container mx-auto">
				<h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
					Why Choose ZugzBag All-in-One Grow Bags?
				</h2>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, index) => (
						<li key={index}>
							<Card className="bg-secondary/50 backdrop-blur-sm border-purple/20 hover:border-purple/40 transition-colors card-hover">
								<CardHeader>
									<feature.icon className="w-12 h-12 text-purple mb-4" aria-hidden="true" />
									<CardTitle className="text-xl text-white">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-400">{feature.description}</p>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
