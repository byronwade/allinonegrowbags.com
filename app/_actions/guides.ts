import { cache } from "react";
import { client as payloadPromise } from "../_lib/payload";
import { Guide } from "@/payload-types";
import { notFound } from "next/navigation";

export type GuideDifficulty = "beginner" | "intermediate" | "advanced";

export const getGuideBySlug = cache(async (slug: string) => {
	try {
		const payload = await payloadPromise;
		const guides = await payload.find({
			collection: "guides",
			where: {
				slug: {
					equals: slug,
				},
				status: {
					equals: "published",
				},
				publishedAt: {
					less_than_equal: new Date().toISOString(),
				},
			},
		});

		if (!guides.docs[0]) {
			notFound();
		}

		return guides.docs[0] as Guide;
	} catch (error) {
		console.error("Error fetching guide:", error);
		throw error;
	}
});

export const getGuides = cache(async (options?: { page?: number; limit?: number; difficulty?: GuideDifficulty }) => {
	const { page = 1, limit = 10, difficulty } = options || {};

	try {
		const payload = await payloadPromise;
		const guides = await payload.find({
			collection: "guides",
			where: {
				status: {
					equals: "published",
				},
				publishedAt: {
					less_than_equal: new Date().toISOString(),
				},
				...(difficulty
					? {
							difficulty: {
								equals: difficulty,
							},
						}
					: {}),
			},
			page,
			limit,
			sort: "-publishedAt",
		});

		return guides;
	} catch (error) {
		console.error("Error fetching guides:", error);
		throw error;
	}
});

export const getRecentGuides = cache(async (limit: number = 3) => {
	try {
		const payload = await payloadPromise;
		const guides = await payload.find({
			collection: "guides",
			where: {
				status: {
					equals: "published",
				},
				publishedAt: {
					less_than_equal: new Date().toISOString(),
				},
			},
			limit,
			sort: "-publishedAt",
		});

		return guides.docs as Guide[];
	} catch (error) {
		console.error("Error fetching recent guides:", error);
		throw error;
	}
});

export const getGuidesByDifficulty = cache(async (difficulty: GuideDifficulty, limit: number = 10) => {
	try {
		const payload = await payloadPromise;
		const guides = await payload.find({
			collection: "guides",
			where: {
				status: {
					equals: "published",
				},
				publishedAt: {
					less_than_equal: new Date().toISOString(),
				},
				difficulty: {
					equals: difficulty,
				},
			},
			limit,
			sort: "-publishedAt",
		});

		return guides.docs as Guide[];
	} catch (error) {
		console.error("Error fetching guides by difficulty:", error);
		throw error;
	}
});
