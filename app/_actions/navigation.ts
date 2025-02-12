"use server";

import { cache } from "react";

export interface NavigationLink {
	label: string;
	href: `/${string}` | `/#${string}` | "/";
}

export interface FooterSection {
	heading: string;
	links: NavigationLink[];
}

export interface NavigationData {
	header: NavigationLink[];
	footer: FooterSection[];
}

export const defaultNavigation: NavigationData = {
	header: [
		{ label: "Home", href: "/" },
		{ label: "Features", href: "/#features" },
		{ label: "How It Works", href: "/all-in-one-grow-bags" },
		{ label: "Bulk Orders", href: "/#bulk-orders" },
		{ label: "FAQ", href: "/#faq" },
		{ label: "Blog", href: "/blog" },
		{ label: "Guides", href: "/guides" },
		{ label: "Reviews", href: "/reviews" },
		{ label: "Contact", href: "/contact" },
	],
	footer: [
		{
			heading: "Product",
			links: [
				{ label: "Features", href: "/#features" },
				{ label: "How It Works", href: "/all-in-one-grow-bags" },
				{ label: "Bulk Orders", href: "/#bulk-orders" },
				{ label: "FAQ", href: "/#faq" },
			],
		},
		{
			heading: "Resources",
			links: [
				{ label: "Blog", href: "/blog" },
				{ label: "Guides", href: "/guides" },
				{ label: "Reviews", href: "/reviews" },
			],
		},
		{
			heading: "Company",
			links: [
				{ label: "About", href: "/about" },
				{ label: "Contact", href: "/contact" },
				{ label: "Privacy Policy", href: "/privacy-policy" },
				{ label: "Terms of Service", href: "/terms-of-service" },
			],
		},
	],
};

export const getNavigation = cache(async (location: "header" | "footer") => {
	return defaultNavigation[location];
});
