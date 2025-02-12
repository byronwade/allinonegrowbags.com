"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { siteNavigation } from "@/lib/navigation";

export default function Footer() {
	useEffect(() => {
		const smoothScroll = (e: MouseEvent) => {
			e.preventDefault();
			const target = e.target as HTMLAnchorElement;
			const targetId = target.getAttribute("href")?.slice(1);
			if (targetId) {
				const element = document.getElementById(targetId);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}
		};

		const links = document.querySelectorAll('a[href^="#"]');
		links.forEach((link) => {
			link.addEventListener("click", smoothScroll as EventListener);
		});

		return () => {
			links.forEach((link) => {
				link.removeEventListener("click", smoothScroll as EventListener);
			});
		};
	}, []);

	return (
		<footer className="bg-background border-t border-primary/20">
			<div className="container mx-auto py-12 px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-1">
						<h3 className="text-xl font-bold mb-4 text-white">ZugzBag</h3>
						<p className="text-gray-400 mb-4">Premium all-in-one mushroom grow bags for cultivation enthusiasts.</p>
						<div className="flex space-x-4">
							<a href="https://facebook.com/zugzbag" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple transition-colors">
								<Facebook className="w-5 h-5" />
							</a>
							<a href="https://instagram.com/zugzbag" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple transition-colors">
								<Instagram className="w-5 h-5" />
							</a>
							<a href="https://twitter.com/zugzbag" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple transition-colors">
								<Twitter className="w-5 h-5" />
							</a>
						</div>
					</div>

					{siteNavigation.footer.map((section, index) => (
						<div key={index}>
							<h3 className="text-xl font-bold mb-4 text-white">{section.heading}</h3>
							<ul className="space-y-2">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link href={link.href} className="text-gray-400 hover:text-purple transition-colors">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-8 pt-8 border-t border-primary/20 text-center text-gray-400">
					<p className="mb-2">&copy; {new Date().getFullYear()} ZugzBag. All rights reserved.</p>
					<div className="flex justify-center space-x-4">
						<Link href="https://zugzology.com" className="text-purple hover:text-purple-dark transition-colors">
							Back to Zugzology
						</Link>
						<span className="text-gray-600">|</span>
						<Link href="/privacy-policy" className="text-gray-400 hover:text-purple transition-colors">
							Privacy Policy
						</Link>
						<span className="text-gray-600">|</span>
						<Link href="/terms-of-service" className="text-gray-400 hover:text-purple transition-colors">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

