import { cache } from "react";
import { payload } from "@/payload";
import { Page } from "@/payload-types";
import { notFound } from "next/navigation";

export const getPageBySlug = cache(async (slug: string) => {
	try {
		const pages = await payload.find({
			collection: "pages",
			where: {
				slug: {
					equals: slug,
				},
				status: {
					equals: "published",
				},
			},
		});

		if (!pages.docs[0]) {
			notFound();
		}

		return pages.docs[0] as Page;
	} catch (error) {
		console.error("Error fetching page:", error);
		throw error;
	}
});

export const getPages = cache(async (options?: { page?: number; limit?: number; parent?: string | null }) => {
	const { page = 1, limit = 10, parent = null } = options || {};

	try {
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

		return pages;
	} catch (error) {
		console.error("Error fetching pages:", error);
		throw error;
	}
});

export const getChildPages = cache(async (parentSlug: string) => {
	try {
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

		return pages;
	} catch (error) {
		console.error("Error fetching child pages:", error);
		throw error;
	}
});
