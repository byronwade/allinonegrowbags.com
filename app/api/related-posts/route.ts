import { NextResponse } from "next/server";
import { getMDXPosts } from "@/lib/mdx";
import { unstable_cache } from "next/cache";

interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	author?: string;
	image?: string;
	keywords?: string[];
	score?: number;
}

const getRelatedPostsWithCache = unstable_cache(
	async (contentType: string, currentSlug: string, keywords: string[]) => {
		try {
			const allPosts = (await getMDXPosts(contentType as "guides" | "learn")) as Post[];
			const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

			// If no other posts, return empty array
			if (!otherPosts.length) {
				return [];
			}

			// Score each post based on various factors
			const scoredPosts = otherPosts.map((post: Post) => {
				let score = 0;

				// Add recency score (newer posts score higher)
				const postDate = new Date(post.date).getTime();
				const now = Date.now();
				const daysSincePublish = (now - postDate) / (1000 * 60 * 60 * 24);

				// Stronger recency bias - more recent posts get higher base scores
				score += Math.max(0.5, 2 - daysSincePublish / 180); // Base score from recency (0.5 to 2)

				// If we have keywords, add relevance scoring
				if (keywords?.length && post.keywords?.length) {
					keywords.forEach((keyword: string) => {
						const normalizedKeyword = keyword.toLowerCase().trim();
						post.keywords?.forEach((postKeyword: string) => {
							const normalizedPostKeyword = postKeyword.toLowerCase().trim();
							// Exact match
							if (normalizedPostKeyword === normalizedKeyword) {
								score += 2;
							}
							// Partial match
							else if (normalizedPostKeyword.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedPostKeyword)) {
								score += 1;
							}
						});
					});

					// Check title and description for keyword matches
					const normalizedTitle = post.title.toLowerCase();
					const normalizedDesc = post.description.toLowerCase();
					keywords.forEach((keyword: string) => {
						const normalizedKeyword = keyword.toLowerCase().trim();
						if (normalizedTitle.includes(normalizedKeyword)) {
							score += 1;
						}
						if (normalizedDesc.includes(normalizedKeyword)) {
							score += 0.5;
						}
					});
				}

				// Add a small base score for being in the same content type
				score += 0.1;

				return {
					...post,
					score,
				};
			});

			// Sort by score (which includes recency) and get top 3
			const sortedPosts = scoredPosts.sort((a, b) => (b.score || 0) - (a.score || 0));

			// Always return up to 3 posts
			return sortedPosts.slice(0, 3);
		} catch (error) {
			console.error("Error in getRelatedPostsWithCache:", error);
			return [];
		}
	},
	["related-posts"],
	{
		revalidate: 3600,
		tags: ["related-posts"],
	}
);

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const contentType = searchParams.get("type") as "guides" | "learn";
		const currentSlug = searchParams.get("currentSlug");
		const keywords = searchParams.get("keywords")?.split(",").filter(Boolean) || [];

		console.log("API received request with params:", {
			contentType,
			currentSlug,
			keywords,
			url: request.url,
		});

		if (!contentType || !currentSlug) {
			console.error("Missing required parameters:", { contentType, currentSlug });
			return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
		}

		const relatedPosts = await getRelatedPostsWithCache(contentType, currentSlug, keywords);

		console.log("Returning related posts:", {
			count: relatedPosts.length,
			posts: relatedPosts.map((p) => ({ slug: p.slug, score: p.score })),
		});

		return NextResponse.json(relatedPosts);
	} catch (error) {
		console.error("Error in related posts API:", error);
		return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
	}
}
