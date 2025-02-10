import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://allinonegrowbags.com";
	const title = "ZugzBag: #1 All-in-One Mushroom Grow Bags | Premium Bulk Supplier";
	const description = "ZugzBag offers the best all-in-one mushroom grow bags for commercial growers & enthusiasts. 4 lbs premium substrate, made in USA. Up to 30% off bulk orders. Perfect for oyster, shiitake, & lion's mane.";
	const mainImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp";

	return {
		metadataBase: new URL(baseUrl),
		title: {
			default: title,
			template: "%s | ZugzBag",
		},
		description,
		keywords: ["all-in-one grow bag", "mushroom grow bags", "bulk mushroom supplies", "sterile grow bags", "mushroom cultivation kit", "commercial mushroom growing", "ZugzBag", "Made in USA", "Santa Cruz mushroom supplies", "gourmet mushroom growing", "oyster mushroom substrate", "shiitake cultivation", "lion's mane growing kit"],
		authors: [{ name: "ZugzBag", url: baseUrl }],
		creator: "ZugzBag",
		publisher: "ZugzBag",
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		alternates: {
			canonical: baseUrl,
		},
		openGraph: {
			title,
			description,
			images: [
				{
					url: mainImage,
					width: 1200,
					height: 630,
					alt: "ZugzBag All-in-One Mushroom Grow Bag",
				},
			],
			type: "website",
			locale: "en_US",
			url: baseUrl,
			siteName: "ZugzBag",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [mainImage],
			creator: "@zugzbag",
			site: "@zugzbag",
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		verification: {
			google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
		},
		category: "E-commerce",
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://allinonegrowbags.com";
	const mainImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp";

	const organizationJsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "ZugzBag",
		url: baseUrl,
		logo: mainImage,
		sameAs: ["https://facebook.com/zugzbag", "https://instagram.com/zugzbag", "https://twitter.com/zugzbag"],
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+1-555-123-4567",
			contactType: "customer service",
			email: "zugzology@gmail.com",
			areaServed: "US",
			availableLanguage: "English",
		},
	};

	const productJsonLd = {
		"@context": "https://schema.org/",
		"@type": "Product",
		name: "ZugzBag All-in-One Mushroom Grow Bag",
		image: mainImage,
		description: "Premium all-in-one mushroom grow bag with 4 lbs of sterilized substrate. Perfect for gourmet mushroom cultivation.",
		brand: {
			"@type": "Brand",
			name: "ZugzBag",
		},
		offers: {
			"@type": "AggregateOffer",
			url: `${baseUrl}/all-in-one-grow-bags`,
			priceCurrency: "USD",
			lowPrice: "29.99",
			highPrice: "29.99",
			offerCount: "1",
			availability: "https://schema.org/InStock",
			seller: {
				"@type": "Organization",
				name: "ZugzBag",
			},
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "5",
			reviewCount: "89",
		},
	};

	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "ZugzBag",
		url: baseUrl,
		potentialAction: {
			"@type": "SearchAction",
			target: `${baseUrl}/search?q={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};

	return (
		<html lang="en" className="dark">
			<head>
				<Script id="organization-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
				<Script id="product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
				<Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
				<link rel="canonical" href={baseUrl} />
				<meta name="theme-color" content="#000000" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon-192x192.png" />
			</head>
			<body className={inter.className}>
				<CartProvider>
					<div className="min-h-screen bg-background">
						<div className="bg-primary/20 text-white py-2">
							<div className="container mx-auto text-center text-sm">Free Shipping On All-in-One Grow Bags | Same Day Processing</div>
						</div>
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
				</CartProvider>
				<Toaster />
			</body>
			<GoogleAnalytics gaId="G-RN5EV85CL0" />
		</html>
	);
}
