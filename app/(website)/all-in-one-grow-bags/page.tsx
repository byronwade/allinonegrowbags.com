import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "All-In-One Grow Bags - Your Easy Guide To Growing Mushrooms",
	description: "Discover how to grow mushrooms easily with all-in-one grow bags. Learn the steps, benefits, and top brands for successful cultivation!",
	keywords: ["all in one grow bags", "mushroom cultivation", "grow bags", "mushroom growing", "cultivation guide", "sterile substrate", "mushroom substrate", "growing mushrooms", "mushroom growing supplies", "cultivation equipment"],
	openGraph: {
		title: "All-In-One Grow Bags - Your Easy Guide To Growing Mushrooms",
		description: "Discover how to grow mushrooms easily with all-in-one grow bags. Learn the steps, benefits, and top brands for successful cultivation!",
		type: "article",
		images: [
			{
				url: "/0_All-in-one grow bags.jpg",
				width: 1200,
				height: 630,
				alt: "All-in-one mushroom grow bags",
			},
		],
	},
};

export default function AllInOneGrowBags() {
  return (
		<article className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="py-8 hero-pattern sm:py-10 md:py-12">
				<div className="container px-4 mx-auto sm:px-6 md:px-8">
					<h1 className="max-w-4xl mx-auto mb-4 text-3xl font-bold text-center text-white sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">All-In-One Grow Bags - Your Easy Guide To Growing Mushrooms</h1>
					<p className="max-w-3xl mx-auto mb-6 text-base text-center text-gray-300 sm:text-lg md:text-xl">Grow gourmet mushrooms effortlessly with our premium all-in-one grow bags. Each bag contains nearly a quart of sterilized whole oat grain spawn, topped with perfectly hydrated CVG substrate (Coco Coir, Vermiculite, and Minerals).</p>
					<div className="flex flex-wrap justify-center gap-4 mb-6">
						<div className="px-4 py-2 text-sm text-white rounded-full bg-purple/30 backdrop-blur-sm sm:text-base">🌾 4 lbs Total Growing Material</div>
						<div className="px-4 py-2 text-sm text-white rounded-full bg-purple/30 backdrop-blur-sm sm:text-base">🧪 Sterilized & Ready to Use</div>
						<div className="px-4 py-2 text-sm text-white rounded-full bg-purple/30 backdrop-blur-sm sm:text-base">🔬 0.22 μm Filter Patch</div>
						<div className="px-4 py-2 text-sm text-white rounded-full bg-purple/30 backdrop-blur-sm sm:text-base">💉 Silicone Injection Port</div>
					</div>
					<div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
						<span>Perfect for:</span>
						<span className="text-primary">Gourmet</span>
						<span>•</span>
						<span className="text-primary">Medicinal</span>
						<span>•</span>
						<span className="text-primary">Culinary Mushrooms</span>
					</div>
				</div>
			</div>

			{/* Featured Product Card */}
			<div className="container px-4 mx-auto -mt-8 sm:px-6 md:px-8">
				<Card className="max-w-4xl mx-auto transition-colors bg-secondary/50 backdrop-blur-sm border-purple/20 hover:border-purple/40">
					<CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
						<div className="relative w-full h-48 sm:w-32 sm:h-32">
							<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp" alt="ZugzBag All-in-One Mushroom Grow Bag" fill className="object-cover rounded-lg" />
						</div>
						<div className="flex-1">
							<CardTitle className="mb-2 text-xl text-white sm:text-2xl">ZugzBag All-in-One Mushroom Grow Bag</CardTitle>
							<div className="flex items-center gap-1 mb-2">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
								))}
								<span className="ml-2 text-sm text-gray-400">89 Reviews</span>
							</div>
							<p className="text-sm text-gray-300 sm:text-base">Professional-grade 4 lbs sterile substrate with filter patch. Perfect for beginners and experts.</p>
						</div>
						<div className="w-full mt-4 text-left sm:w-auto sm:text-right sm:mt-0">
							<p className="mb-2 text-2xl font-bold text-white">$29.99</p>
							<Link href="/#buy-now">
								<Button className="w-full sm:w-auto bg-purple hover:bg-purple-dark">
									<ShoppingCart className="w-4 h-4 mr-2" />
									Buy Now
								</Button>
							</Link>
						</div>
					</CardHeader>
				</Card>
			</div>

			{/* Table of Contents */}
			<div className="container px-4 py-8 mx-auto sm:px-6 md:px-8 sm:py-10 md:py-12">
				<div className="max-w-4xl mx-auto prose prose-lg prose-invert">
					<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Table of Contents</h2>
					<ul className="space-y-2 text-base text-gray-300 sm:text-lg">
						<li>
							<a href="#introduction" className="text-gray-300 hover:text-purple">
								Introduction to All-in-One Grow Bags
							</a>
						</li>
						<li>
							<a href="#key-features" className="text-gray-300 hover:text-purple">
								Key Features of All-in-One Grow Bags
							</a>
						</li>
						<li>
							<a href="#ingredients" className="text-gray-300 hover:text-purple">
								What&apos;s Inside Your ZugzBag?
							</a>
						</li>
						<li>
							<a href="#how-to-use" className="text-gray-300 hover:text-purple">
								How to Use All-in-One Grow Bags
							</a>
						</li>
						<li>
							<a href="#top-products" className="text-gray-300 hover:text-purple">
								Top Products and Brands
							</a>
						</li>
						<li>
							<a href="#benefits" className="text-gray-300 hover:text-purple">
								Benefits of Using All-in-One Grow Bags
							</a>
						</li>
						<li>
							<a href="#resources" className="text-gray-300 hover:text-purple">
								Additional Resources
							</a>
						</li>
						<li>
							<a href="#faq" className="text-gray-300 hover:text-purple">
								Frequently Asked Questions
							</a>
						</li>
						<li>
							<a href="#related" className="text-gray-300 hover:text-purple">
								Related Posts
							</a>
						</li>
					</ul>

					{/* Key Takeaways */}
					<div className="p-6 my-8 rounded-lg bg-secondary/50 backdrop-blur-sm">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Key Takeaways</h2>
						<ul className="space-y-2 text-base text-gray-300 sm:text-lg">
							<li>All-in-one grow bags simplify mushroom cultivation by providing pre-sterilized substrates and grains in a single package.</li>
							<li>Key features include self-healing injection ports, compact design, and high yield potential.</li>
							<li>The inoculation process is straightforward with sterile syringes and proper technique.</li>
							<li>Cost-effective solution compared to traditional growing methods.</li>
						</ul>
					</div>

					{/* Main Content Sections */}
					<section id="introduction">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Introduction to All-in-One Grow Bags</h2>
						<div className="w-full mb-6 aspect-video sm:mb-8">
							<iframe width="100%" height="100%" src="https://www.youtube.com/embed/0EE-YeQpAb0" title="Introduction to All-in-One Grow Bags" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="rounded-xl" />
						</div>
						<p className="text-base text-gray-300 sm:text-lg">All-in-one grow bags are pre-packaged solutions designed to simplify mushroom cultivation. These bags typically contain a mix of sterilized substrate and grains, creating an ideal environment for growing mushrooms. They often include features like self-healing injection ports, which make inoculation easy and reduce the risk of contamination.</p>
					</section>

					<section id="key-features">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Key Features of All-in-One Grow Bags</h2>
						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Pre-Sterilized Substrates and Grains</h3>
						<p className="mb-6 text-base text-gray-300 sm:text-lg">One of the standout features of all-in-one grow bags is the inclusion of pre-sterilized substrates and grains. This eliminates the need for users to sterilize materials themselves, which can be a time-consuming and technical process. The substrates are carefully prepared to provide the perfect environment for mushroom growth, ensuring a higher success rate.</p>

						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Self-Healing Injection Ports</h3>
						<p className="mb-6 text-base text-gray-300 sm:text-lg">Another key feature is the self-healing injection port, which simplifies the inoculation process. This port allows you to inject liquid culture or spores into the bag without exposing the contents to contaminants. After the injection, the port seals itself, maintaining a sterile environment.</p>

						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Compact and User-Friendly Design</h3>
						<p className="text-base text-gray-300 sm:text-lg">All-in-one grow bags are designed to be compact and easy to use, making them ideal for small spaces or urban environments. Their user-friendly design means you don&apos;t need a lot of equipment or experience to get started.</p>
					</section>

					{/* New Ingredients Section */}
					<section id="ingredients">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">What&apos;s Inside Your ZugzBag?</h2>

						<div className="p-6 mb-8 rounded-lg bg-secondary/50 backdrop-blur-sm">
							<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl">Premium 4 lbs Growing Material</h3>
							<div className="space-y-4">
								<div>
									<h4 className="mb-2 text-lg font-semibold text-white">Grain Spawn Layer (1 Quart)</h4>
									<p className="text-base text-gray-300 sm:text-lg">Premium sterilized whole oat grains, providing the perfect nutrition foundation for strong mycelial growth.</p>
								</div>
								<div>
									<h4 className="mb-2 text-lg font-semibold text-white">CVG Substrate Blend</h4>
									<ul className="space-y-1 text-base text-gray-300 list-disc list-inside sm:text-lg">
										<li>Coco Coir - Provides optimal moisture retention and structure</li>
										<li>Vermiculite - Enhances air exchange and water distribution</li>
										<li>Gypsum & Minerals - Essential nutrients for healthy mushroom development</li>
									</ul>
								</div>
							</div>
						</div>

						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl">Compatible Mushroom Varieties</h3>
						<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
							<div className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm">
								<h4 className="mb-2 text-lg font-semibold text-white">Culinary Varieties</h4>
								<ul className="space-y-1 text-base text-gray-300 sm:text-lg">
									<li>• Button Mushrooms (Agaricus)</li>
									<li>• Wine Caps (Stropharia)</li>
									<li>• Shaggy Mane</li>
									<li>• Silky Rosegill</li>
									<li>• Pearl Oyster</li>
									<li>• King Oyster</li>
									<li>• Shiitake</li>
								</ul>
							</div>
							<div className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm">
								<h4 className="mb-2 text-lg font-semibold text-white">Medicinal Varieties</h4>
								<ul className="space-y-1 text-base text-gray-300 sm:text-lg">
									<li>• Lion&apos;s Mane</li>
									<li>• Reishi</li>
									<li>• Turkey Tail</li>
									<li>• Cordyceps</li>
									<li>• Chaga</li>
									<li>• Maitake</li>
								</ul>
							</div>
							<div className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm">
								<h4 className="mb-2 text-lg font-semibold text-white">Specialty Varieties</h4>
								<ul className="space-y-1 text-base text-gray-300 sm:text-lg">
									<li>• Morels (sclerotia)</li>
									<li>• Black Pearl</li>
									<li>• Pink Oyster</li>
									<li>• Blue Oyster</li>
									<li>• Yellow Oyster</li>
									<li>• Phoenix Oyster</li>
								</ul>
							</div>
						</div>

						<div className="p-4 border rounded-lg bg-purple/20 border-purple">
							<p className="text-sm text-gray-300">
								<strong className="text-white">Legal Notice:</strong> Our all-in-one grow bags are designed and sold for the cultivation of gourmet and medicinal mushrooms only. Any communication suggesting illegal use will void all warranties and future sales. Always verify local regulations regarding mushroom cultivation in your area.
							</p>
						</div>
					</section>

					<section id="how-to-use">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">How to Use All-in-One Grow Bags</h2>
						<div className="my-6 sm:my-8">
							<Image src="/3_how-to-use-all-in-one-grow-bags.jpg" alt="Step-by-step guide to using all-in-one grow bags" width={800} height={500} className="rounded-xl" />
						</div>
						<ol className="space-y-4 text-base text-gray-300 sm:text-lg">
							<li>
								<strong className="text-white">Sanitize and Inoculate</strong>
								<ul className="mt-2 space-y-1">
									<li>Clean your workspace thoroughly</li>
									<li>Sanitize the injection port with alcohol</li>
									<li>Inject spores or liquid culture</li>
								</ul>
							</li>
							<li>
								<strong className="text-white">Incubate and Colonize</strong>
								<ul className="mt-2 space-y-1">
									<li>Store in a warm, dark place (70-75°F)</li>
									<li>Monitor mycelium growth (7-14 days)</li>
								</ul>
							</li>
							<li>
								<strong className="text-white">Mix and Wait</strong>
								<ul className="mt-2 space-y-1">
									<li>Gently mix once grain is fully colonized</li>
									<li>Allow substrate to colonize (1-2 weeks)</li>
								</ul>
							</li>
							<li>
								<strong className="text-white">Fruit and Harvest</strong>
								<ul className="mt-2 space-y-1">
									<li>Introduce fresh air and light</li>
									<li>Maintain proper humidity</li>
									<li>Harvest when caps are fully developed</li>
								</ul>
							</li>
						</ol>
					</section>

					<section id="top-products">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Top Products and Brands for All-in-One Grow Bags</h2>
						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Popular Brands and Their Offerings</h3>
						<p className="mb-6 text-base text-gray-300 sm:text-lg">When it comes to all-in-one grow bags, several brands stand out for their quality and reliability. Zugzology is a top choice, offering pre-sterilized and ready-to-use bags perfect for beginners and experienced growers alike.</p>

						<div className="grid grid-cols-1 gap-6 my-6 md:grid-cols-2 not-prose sm:my-8">
							<Card className="bg-secondary/50 backdrop-blur-sm border-purple/20">
								<CardHeader>
									<CardTitle className="text-white">Zugzology Grow Bags</CardTitle>
									<ul className="mt-4 space-y-2 text-gray-300">
										<li>Pre-sterilized substrate</li>
										<li>Self-healing injection port</li>
										<li>High success rate</li>
										<li>Perfect for beginners</li>
									</ul>
								</CardHeader>
							</Card>
							<Card className="bg-secondary/50 backdrop-blur-sm border-purple/20">
								<CardHeader>
									<CardTitle className="text-white">Premium Liquid Cultures</CardTitle>
									<ul className="mt-4 space-y-2 text-gray-300">
										<li>Various strains available</li>
										<li>High-quality genetics</li>
										<li>Fast colonization</li>
										<li>Guaranteed viability</li>
									</ul>
								</CardHeader>
							</Card>
						</div>
					</section>

					<section id="benefits">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Benefits of Using All-in-One Grow Bags</h2>
						<div className="my-6 sm:my-8">
							<Image src="/5_benefits-of-using-all-in-one-grow-bags.jpg" alt="Benefits of using all-in-one mushroom grow bags" width={800} height={500} className="rounded-xl" />
						</div>
						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Convenience for Beginners</h3>
						<p className="mb-6 text-base text-gray-300 sm:text-lg">All-in-one grow bags are perfect for beginners, eliminating the need for complex preparation and sterilization steps. Everything you need comes pre-sterilized and ready to use.</p>

						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">High Yield and Quality Results</h3>
						<p className="mb-6 text-base text-gray-300 sm:text-lg">These bags are designed to create the ideal environment for mushrooms to thrive, leading to high yields and consistent quality. The pre-sterilized substrates and grains are carefully balanced to support robust mycelium growth.</p>

						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Cost-Effectiveness</h3>
						<p className="text-base text-gray-300 sm:text-lg">Compared to traditional methods requiring expensive equipment like pressure cookers and sterilizers, all-in-one grow bags offer a cost-effective solution for mushroom cultivation.</p>
					</section>

					<section id="resources">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Additional Resources for Mushroom Cultivation</h2>
						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Educational Guides and Tutorials</h3>
						<p className="mb-6 text-base text-gray-300 sm:text-lg">Learning the ins and outs of mushroom cultivation is easier with the right resources. Many online platforms offer step-by-step guides and video tutorials to help you get started.</p>

						<h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl sm:mb-4">Recommended Tools and Accessories</h3>
						<p className="mb-4 text-base text-gray-300 sm:text-lg">While all-in-one grow bags simplify the process, a few additional tools can enhance your mushroom-growing experience:</p>
						<ul className="space-y-2 text-base text-gray-300 sm:text-lg">
							<li>Sterile syringes for inoculation</li>
							<li>Humidity tent or fruiting chamber</li>
							<li>Temperature and humidity monitors</li>
							<li>Alcohol wipes for sterilization</li>
						</ul>
					</section>

					<section id="faq">
						<h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Frequently Asked Questions</h2>
						<div className="space-y-6">
							<div>
								<h3 className="mb-4 text-xl font-semibold text-white sm:text-2xl">What are all-in-one grow bags used for?</h3>
								<p className="text-base text-gray-300 sm:text-lg">All-in-one grow bags are specifically designed for mushroom cultivation. They contain pre-sterilized substrates and grains, making it easy for growers to inoculate and grow mushrooms without extensive setup.</p>
							</div>
							<div>
								<h3 className="mb-4 text-xl font-semibold text-white sm:text-2xl">How do I inoculate all-in-one grow bags?</h3>
								<p className="text-base text-gray-300 sm:text-lg">To inoculate all-in-one grow bags, you will need a syringe filled with mushroom spores or liquid culture. Simply insert the needle into the self-healing injection port of the bag and inject the spores. Make sure to follow sterile techniques to avoid contamination.</p>
							</div>
							<div>
								<h3 className="mb-4 text-xl font-semibold text-white sm:text-2xl">Can I reuse all-in-one grow bags?</h3>
								<p className="text-base text-gray-300 sm:text-lg">No, all-in-one grow bags are intended for single use. After the mushrooms have been harvested, the bags should be disposed of to prevent contamination and ensure the best results for future grows.</p>
							</div>
							<div>
								<h3 className="mb-4 text-xl font-semibold text-white sm:text-2xl">What types of mushrooms can I grow?</h3>
								<p className="text-base text-gray-300 sm:text-lg">You can grow a variety of mushrooms in all-in-one grow bags, including popular types like oyster mushrooms, shiitake mushrooms, and lion&apos;s mane mushrooms. Each type may have specific substrate requirements.</p>
							</div>
						</div>
					</section>

					<section id="related" className="not-prose">
						<h2 className="mb-6 text-2xl font-bold text-white">Related Posts</h2>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<Card className="bg-secondary/50 backdrop-blur-sm border-purple/20">
								<CardHeader>
									<CardTitle className="text-white">
										<Link href="/products/zugzology-gift-card" className="hover:text-purple">
											Zugzology Gift Card – The Ultimate Gift for Mushroom Enthusiasts
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card className="bg-secondary/50 backdrop-blur-sm border-purple/20">
								<CardHeader>
									<CardTitle className="text-white">
										<Link href="/products/wine-caps-liquid-culture" className="hover:text-purple">
											Wine Caps Liquid Culture – Premium Mycology Specimen
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
						</div>
					</section>

					<section id="sources">
						<h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-6">Sources</h2>
						<ul className="space-y-2 text-base text-gray-300 sm:text-lg">
							<li>
								<a href="https://zombiemyco.com/products/mushroom-grow-bag-5lb" className="break-all">
									zombiemyco.com/products/mushroom-grow-bag-5lb
								</a>
							</li>
							<li>
								<a href="https://www.out-grow.com/collections/all-in-one-grow-bag" className="break-all">
									out-grow.com/collections/all-in-one-grow-bag
								</a>
							</li>
							<li>
								<a href="https://northspore.com/products/shroomtek-all-in-one-mushroom-grow-bag" className="break-all">
									northspore.com/products/shroomtek-all-in-one-mushroom-grow-bag
								</a>
							</li>
							<li>
								<a href="https://mushroomsupplies.com/products/mushroom-grow-kit-in-a-bag" className="break-all">
									mushroomsupplies.com/products/mushroom-grow-kit-in-a-bag
								</a>
							</li>
						</ul>
					</section>

					{/* Bottom CTA */}
					<section className="p-6 mt-8 text-center rounded-lg not-prose bg-secondary/50 backdrop-blur-sm sm:p-8 sm:mt-12">
						<h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl sm:mb-4">Ready to Start Growing?</h2>
						<p className="mb-6 text-base text-gray-300 sm:text-lg md:text-xl sm:mb-8">Get started with our professional-grade all-in-one mushroom grow bags today.</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Link href="/#buy-now">
								<Button size="lg" className="w-full text-white sm:w-auto bg-purple hover:bg-purple-dark">
									<ShoppingCart className="w-5 h-5 mr-2" />
									Buy Now
								</Button>
							</Link>
							<Link href="/bulk-orders">
								<Button size="lg" variant="outline" className="w-full sm:w-auto">
									View Bulk Discounts
								</Button>
							</Link>
						</div>
					</section>
				</div>
			</div>
		</article>
  );
}
