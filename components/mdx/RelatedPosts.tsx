import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { unstable_cache } from "next/cache";
import { PostImage } from "./PostImage";
import { mdxPosts, type Post } from "@/app/api/mdx/data";

const FALLBACK_IMAGE = "/3_how-to-use-all-in-one-grow-bags.jpg";

interface RelatedPostsProps {
	currentSlug: string;
	currentKeywords: string[];
	contentType: "guides" | "learn";
}

async function getRelatedPosts(currentSlug: string, currentKeywords: string[], contentType: "guides" | "learn"): Promise<Post[]> {
	try {
		const allPosts = mdxPosts[contentType];
		const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

		// If no other posts, return empty array
		if (!otherPosts.length) {
			return [];
		}

		// Score each post based on various factors
		const scoredPosts = otherPosts.map((post) => {
			let score = 0;

			// Add recency score (newer posts score higher)
			const postDate = new Date(post.date).getTime();
			const now = Date.now();
			const daysSincePublish = (now - postDate) / (1000 * 60 * 60 * 24);

			// Stronger recency bias - more recent posts get higher base scores
			score += Math.max(0.5, 2 - daysSincePublish / 180); // Base score from recency (0.5 to 2)

			// If we have keywords, add relevance scoring
			if (currentKeywords?.length && post.keywords?.length) {
				currentKeywords.forEach((keyword) => {
					const normalizedKeyword = keyword.toLowerCase().trim();
					post.keywords?.forEach((postKeyword) => {
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
				currentKeywords.forEach((keyword) => {
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
		console.error("Error getting related posts:", error);
		return [];
	}
}

const cachedGetRelatedPosts = unstable_cache(getRelatedPosts, ["related-posts"], {
	revalidate: 3600,
	tags: ["related-posts"],
});

export default async function RelatedPosts({ currentSlug, currentKeywords, contentType }: RelatedPostsProps) {
	console.log("RelatedPosts component called with:", { currentSlug, contentType, keywords: currentKeywords });

	const relatedPosts = await cachedGetRelatedPosts(currentSlug, currentKeywords || [], contentType);
	console.log("Got related posts:", { count: relatedPosts.length });

	// Always render the section, even if no posts are found
	return (
		<section className="mt-16 border-t border-purple/20 pt-12">
			<h2 className="text-3xl font-bold text-white mb-8">Continue Reading</h2>
			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{relatedPosts.map((post) => (
					<Link key={post.slug} href={`/${contentType}/${post.slug}`} className="block no-underline group">
						<article className="bg-secondary/50 backdrop-blur-sm border border-purple/20 rounded-lg overflow-hidden hover:border-purple/40 transition-colors h-full">
							<div className="relative aspect-[16/9]">
								<PostImage src={post.image || FALLBACK_IMAGE} alt={post.title} />
							</div>
							<div className="p-6 space-y-4">
								<div className="space-y-2">
									<h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-purple transition-colors">{post.title}</h3>
									<p className="text-sm text-gray-300 line-clamp-2">{post.description}</p>
								</div>
								<div className="flex items-center justify-between text-sm text-gray-400">
									<time dateTime={post.date}>
										{new Date(post.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
									<span>{post.readTime}</span>
								</div>
								<div className="pt-2 flex items-center text-purple group-hover:text-purple-dark">
									Read More
									<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
								</div>
							</div>
						</article>
					</Link>
				))}
			</div>
		</section>
	);
}
