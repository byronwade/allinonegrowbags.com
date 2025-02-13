import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { unstable_cache } from "next/cache";
import { PostImage } from "./PostImage";

const FALLBACK_IMAGE = "/3_how-to-use-all-in-one-grow-bags.jpg";

interface RelatedPostsProps {
	currentSlug: string;
	currentKeywords: string[];
	contentType: "guides" | "learn";
}

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

async function getRelatedPosts(currentSlug: string, currentKeywords: string[], contentType: "guides" | "learn"): Promise<Post[]> {
	try {
		// Construct URL with proper origin for server-side
		const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
		const params = new URLSearchParams({
			type: contentType,
			currentSlug,
			keywords: currentKeywords.join(","),
		});

		const url = `${baseUrl}/api/related-posts?${params.toString()}`;
		console.log("Fetching related posts from:", url);

		const response = await fetch(url, {
			next: { tags: ["related-posts"] },
		});

		if (!response.ok) {
			console.error("Failed to fetch related posts:", {
				status: response.status,
				statusText: response.statusText,
				url: response.url,
			});
			return [];
		}

		const data = await response.json();

		// Ensure we have valid posts with required fields
		const validPosts = data.filter((post: Post) => post && post.slug && post.title && post.description && post.date && post.readTime);

		console.log("Related posts data:", {
			count: validPosts.length,
			posts: validPosts.map((p: Post) => ({ slug: p.slug, score: p.score })),
		});

		return validPosts;
	} catch (error) {
		console.error("Error fetching related posts:", error);
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
				{relatedPosts.map((post: Post) => (
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
