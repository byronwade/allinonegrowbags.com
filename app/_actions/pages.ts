import { cache } from "react";
import { client as payloadPromise } from "../_lib/payload";
import { Page } from "@/payload-types";
import { notFound } from "next/navigation";

export const getPageBySlug = cache(async (slug: string): Promise<Page> => {
	console.log("Fetching page by slug:", slug);
	try {
		console.log("Awaiting payload client");
		const payload = await payloadPromise;
		console.log("Got payload client, fetching page");

		const result = await payload.find({
			collection: "pages",
			where: {
				and: [
					{
						status: {
							equals: "published",
						},
					},
					slug
						? {
								slug: {
									equals: slug,
								},
							}
						: {
								isHomePage: {
									equals: true,
								},
							},
				],
			},
			depth: 2,
		});

		if (result.docs[0]) {
			const page = result.docs[0];
			console.log("Found page with blocks:", JSON.stringify(page.blocks, null, 2));
			console.log("Page details:", {
				title: page.title,
				slug: page.slug,
				isHomePage: page.isHomePage,
				hasBlocks: Array.isArray(page.blocks),
				blockCount: Array.isArray(page.blocks) ? page.blocks.length : 0,
				blockTypes: Array.isArray(page.blocks) ? page.blocks.map((block) => block.blockType) : [],
			});
			return page as Page;
		}

		if (!slug) {
			console.log("No home page found, setting up...");
			await setupHomePage();
			return getPageBySlug("");
		}

		console.log("Page not found, calling notFound()");
		notFound();
		throw new Error("Page not found");
	} catch (error) {
		console.error("Error fetching page:", error);
		throw error;
	}
});

export const getPages = cache(async (options?: { page?: number; limit?: number; parent?: string | null }) => {
	const { page = 1, limit = 10, parent = null } = options || {};
	console.log("Fetching pages with options:", { page, limit, parent });

	try {
		console.log("Awaiting payload client");
		const payload = await payloadPromise;
		console.log("Got payload client, fetching pages");
		const pages = await payload.find({
			collection: "pages",
			where: {
				status: {
					equals: "published",
				},
				...(parent
					? {
							parent: {
								equals: parent,
							},
						}
					: {
							parent: {
								exists: false,
							},
						}),
			},
			page,
			limit,
			sort: "-updatedAt",
		});

		console.log("Pages query result:", { totalDocs: pages.totalDocs, currentPage: pages.page });
		return pages;
	} catch (error) {
		console.error("Error fetching pages:", error);
		throw error;
	}
});

export const getChildPages = cache(async (parentSlug: string) => {
	console.log("Fetching child pages for parent:", parentSlug);
	try {
		console.log("Awaiting payload client");
		const payload = await payloadPromise;
		console.log("Got payload client, fetching child pages");
		const pages = await payload.find({
			collection: "pages",
			where: {
				status: {
					equals: "published",
				},
				parent: {
					equals: parentSlug,
				},
			},
			sort: "-updatedAt",
		});

		console.log("Child pages query result:", { totalDocs: pages.totalDocs });
		return pages;
	} catch (error) {
		console.error("Error fetching child pages:", error);
		throw error;
	}
});

export async function updateContactPage() {
	try {
		console.log("Updating contact page");
		const payload = await payloadPromise;
		const pages = await payload.find({
			collection: "pages",
			where: {
				slug: {
					equals: "contact",
				},
			},
		});

		if (pages.docs[0]) {
			console.log("Found contact page, updating blocks");
			await payload.update({
				collection: "pages",
				id: pages.docs[0].id,
				data: {
					title: "Contact",
					slug: "contact",
					status: "published",
					blocks: [
						{
							blockType: "contact" as const,
						},
					],
				},
			});
			console.log("Contact page updated successfully");
		} else {
			// Create contact page if it doesn't exist
			console.log("Contact page not found, creating new one");
			await payload.create({
				collection: "pages",
				data: {
					title: "Contact",
					slug: "contact",
					status: "published",
					blocks: [
						{
							blockType: "contact" as const,
						},
					],
				},
			});
			console.log("Contact page created successfully");
		}
	} catch (error) {
		console.error("Error updating contact page:", error);
	}
}

export async function setupHomePage() {
	try {
		console.log("Setting up home page");
		const payload = await payloadPromise;

		// First delete existing home page if it exists
		const existingPages = await payload.find({
			collection: "pages",
			where: {
				isHomePage: {
					equals: true,
				},
			},
		});

		if (existingPages.docs[0]) {
			console.log("Deleting existing home page");
			await payload.delete({
				collection: "pages",
				id: existingPages.docs[0].id,
			});
		}

		// First create the hero image
		console.log("Creating hero image");
		const heroImage = await payload.create({
			collection: "media",
			data: {
				alt: "ZugzBag All-in-One Mushroom Grow Bag",
				filename: "hero-image.webp",
				mimeType: "image/webp",
				url: "https://1eogvnqe28zk6ffg.public.blob.vercel-storage.com/hero-image-4lbs-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp",
			},
		});

		console.log("Created hero image:", heroImage);

		// Create new home page
		console.log("Creating new home page");
		const newPage = await payload.create({
			collection: "pages",
			data: {
				title: "Home",
				slug: "",
				status: "published" as const,
				isHomePage: true,
				publishedAt: new Date().toISOString(),
				blocks: [
					{
						blockType: "hero" as const,
						blockName: "Hero Section",
						heading: "ZugzBag: #1 All-in-One Mushroom Grow Bags",
						description: "Premium 4 lbs grow bags with sterilized whole oat grain spawn and perfectly hydrated CVG substrate. Perfect for cultivating culinary, medicinal, and gourmet mushroom varieties.",
						mushroomTypes: [
							{ type: "Oyster", id: "mt1" },
							{ type: "Lion's Mane", id: "mt2" },
							{ type: "Shiitake", id: "mt3" },
							{ type: "Reishi", id: "mt4" },
						],
						image: heroImage.id,
						specs: [
							{ label: "Grain Layer", value: "Whole Oats", id: "spec1" },
							{ label: "Substrate", value: "CVG Blend", id: "spec2" },
							{ label: "Sterile", value: "Ready to Use", id: "spec3" },
						],
					},
					{
						blockType: "features" as const,
						blockName: "Features Section",
						heading: "Why Choose ZugzBag?",
						subheading: "Premium Quality, Expert Support, Fast Shipping",
						features: [
							{
								id: "f1",
								title: "Premium Substrate",
								description: "Perfect blend of sterilized grain spawn and CVG substrate",
								icon: "microscope" as const,
							},
							{
								id: "f2",
								title: "Expert Support",
								description: "Dedicated team of experienced cultivators",
								icon: "heartHandshake" as const,
							},
							{
								id: "f3",
								title: "Fast Shipping",
								description: "Quick delivery across the United States",
								icon: "truck" as const,
							},
						],
					},
				],
			},
		});

		console.log("Home page created successfully:", JSON.stringify(newPage, null, 2));
		return { success: true, message: "Home page created successfully" };
	} catch (error) {
		console.error("Error setting up home page:", error);
		throw error;
	}
}
