import { cache } from "react";
import { client as payloadPromise } from "../_lib/payload";
import { Post } from "@/payload-types";
import { notFound } from "next/navigation";

export type PostCategory = "growing-tips" | "product-reviews" | "news" | "tutorials";

export const getPostBySlug = cache(async (slug: string) => {
	try {
		const payload = await payloadPromise;
		const posts = await payload.find({
			collection: "posts",
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

		if (!posts.docs[0]) {
			notFound();
		}

		return posts.docs[0] as Post;
	} catch (error) {
		console.error("Error fetching post:", error);
		throw error;
	}
});

export const getPosts = cache(async (options?: { page?: number; limit?: number; category?: PostCategory }) => {
	const { page = 1, limit = 10, category } = options || {};

	try {
		const payload = await payloadPromise;
		const posts = await payload.find({
			collection: "posts",
			where: {
				status: {
					equals: "published",
				},
				publishedAt: {
					less_than_equal: new Date().toISOString(),
				},
				...(category
					? {
							category: {
								equals: category,
							},
						}
					: {}),
			},
			page,
			limit,
			sort: "-publishedAt",
		});

		return posts;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
});

export const getRecentPosts = cache(async (limit: number = 3) => {
	try {
		const payload = await payloadPromise;
		const posts = await payload.find({
			collection: "posts",
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

		return posts.docs as Post[];
	} catch (error) {
		console.error("Error fetching recent posts:", error);
		throw error;
	}
});

export const getPostsByCategory = cache(async (category: PostCategory, limit: number = 10) => {
	try {
		const payload = await payloadPromise;
		const posts = await payload.find({
			collection: "posts",
			where: {
				status: {
					equals: "published",
				},
				publishedAt: {
					less_than_equal: new Date().toISOString(),
				},
				category: {
					equals: category,
				},
			},
			limit,
			sort: "-publishedAt",
		});

		return posts.docs as Post[];
	} catch (error) {
		console.error("Error fetching posts by category:", error);
		throw error;
	}
});
