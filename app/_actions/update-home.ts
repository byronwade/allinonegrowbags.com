"use server";

import { client as payloadPromise } from "../_lib/payload";
import type { Page, Media } from "@/payload-types";

type IconType = "filter" | "microscope" | "heartHandshake" | "truck" | "scale" | "percent";

export async function setupHomePage() {
	try {
		console.log("Setting up home page");
		const payload = await payloadPromise;

		// First, create the hero image in the media collection if it doesn't exist
		console.log("Creating hero image in media collection");
		let heroImage: Media;
		const existingImages = await payload.find({
			collection: "media",
			where: {
				filename: {
					equals: "hero-image.webp",
				},
			},
		});

		if (existingImages.docs[0]) {
			heroImage = existingImages.docs[0] as Media;
		} else {
			heroImage = (await payload.create({
				collection: "media",
				data: {
					alt: "ZugzBag All-in-One Mushroom Grow Bag",
					filename: "hero-image.webp",
					mimeType: "image/webp",
					url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp",
				},
			})) as Media;
		}

		// Create the home page with the actual image object
		const homePageData = {
			title: "Home",
			slug: "",
			status: "published" as const,
			isHomePage: true,
			publishedAt: new Date().toISOString(),
			blocks: [
				{
					blockType: "hero" as const,
					heading: "ZugzBag: #1 All-in-One Mushroom Grow Bags",
					description: "Premium 4 lbs grow bags with sterilized whole oat grain spawn and perfectly hydrated CVG substrate. Perfect for cultivating culinary, medicinal, and gourmet mushroom varieties.",
					mushroomTypes: [{ type: "Oyster" }, { type: "Lion's Mane" }, { type: "Shiitake" }, { type: "Reishi" }],
					image: heroImage.id,
					specs: [
						{ label: "Grain Layer", value: "Whole Oats" },
						{ label: "Substrate", value: "CVG Blend" },
						{ label: "Sterile", value: "Ready to Use" },
					],
				},
				{
					blockType: "features" as const,
					heading: "Why Choose ZugzBag?",
					subheading: "Premium Quality, Expert Support, Fast Shipping",
					features: [
						{
							title: "Premium Substrate",
							description: "Perfect blend of sterilized grain spawn and CVG substrate",
							icon: "microscope" as IconType,
						},
						{
							title: "Expert Support",
							description: "Dedicated team of experienced cultivators",
							icon: "heartHandshake" as IconType,
						},
						{
							title: "Fast Shipping",
							description: "Quick delivery across the United States",
							icon: "truck" as IconType,
						},
					],
				},
			],
		} satisfies Omit<Page, "id" | "createdAt" | "updatedAt">;

		try {
			// Check if home page exists
			const pages = await payload.find({
				collection: "pages",
				where: {
					AND: [
						{
							isHomePage: {
								equals: true,
							},
						},
						{
							status: {
								equals: "published",
							},
						},
					],
				},
			});

			if (pages.docs[0]) {
				console.log("Found existing home page, updating");
				const updatedPage = await payload.update({
					collection: "pages",
					id: pages.docs[0].id,
					data: homePageData,
				});
				console.log("Home page updated successfully", updatedPage);
				return { success: true, message: "Home page updated successfully" };
			} else {
				console.log("Creating new home page");
				const newPage = await payload.create({
					collection: "pages",
					data: homePageData,
				});
				console.log("Home page created successfully", newPage);
				return { success: true, message: "Home page created successfully" };
			}
		} catch (error) {
			console.error("Error updating/creating home page:", error);
			throw error;
		}
	} catch (error) {
		console.error("Error setting up home page:", error);
		throw error;
	}
}
