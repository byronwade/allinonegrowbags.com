import { Suspense } from "react";
import { setupHomePage } from "../../_actions/update-home";
import { getPageBySlug } from "../../_actions/pages";
import { getPostBySlug } from "../../_actions/posts";
import { getGuideBySlug } from "../../_actions/guides";
import { BlockRenderer, Block } from "@/components/BlockRenderer";
import UpdateButton from "./update-button";

interface PageParams {
	params: Promise<{
		slug?: string[];
	}>;
}

export async function generateMetadata({ params }: PageParams) {
	const resolvedParams = await params;
	const slug = (resolvedParams?.slug || []).join("/");
	console.log("Generating metadata for slug:", slug);

	try {
		const page = await getPageBySlug(slug).catch(async () => {
			if (!slug) {
				console.log("No home page found, setting up...");
				await setupHomePage();
				return await getPageBySlug("");
			}
			return null;
		});

		if (page) {
			return {
				title: page.title,
			};
		}

		return {};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {};
	}
}

export default async function DynamicPage({ params }: PageParams) {
	const resolvedParams = await params;
	const slug = (resolvedParams?.slug || []).join("/");
	console.log("Rendering dynamic page for slug:", slug);

	try {
		// Try to get the page
		const page = await getPageBySlug(slug).catch(async () => {
			// If this is the home page and it doesn't exist, create it
			if (!slug) {
				console.log("No home page found, setting up...");
				await setupHomePage();
				return await getPageBySlug("");
			}
			return null;
		});

		if (page) {
			console.log("Found page content:", { title: page.title, hasBlocks: !!page.blocks, blocks: page.blocks });
			return (
				<Suspense fallback={<div>Loading page content...</div>}>
					<main className="flex-1">
						{page.blocks && (
							<div suppressHydrationWarning>
								<BlockRenderer blocks={page.blocks as Block[]} />
							</div>
						)}
						{slug === "contact" && <UpdateButton />}
					</main>
				</Suspense>
			);
		}

		const post = await getPostBySlug(slug).catch(() => null);
		if (post) {
			console.log("Found post content:", { title: post.title, hasBlocks: !!post.content });
			return (
				<Suspense fallback={<div>Loading post content...</div>}>
					<main className="flex-1">
						{post.content && (
							<div suppressHydrationWarning>
								<BlockRenderer blocks={post.content as Block[]} />
							</div>
						)}
					</main>
				</Suspense>
			);
		}

		const guide = await getGuideBySlug(slug).catch(() => null);
		if (guide) {
			console.log("Found guide content:", { title: guide.title, hasBlocks: !!guide.content });
			return (
				<Suspense fallback={<div>Loading guide content...</div>}>
					<main className="flex-1">
						{guide.content && (
							<div suppressHydrationWarning>
								<BlockRenderer blocks={guide.content as Block[]} />
							</div>
						)}
					</main>
				</Suspense>
			);
		}

		console.log("No content found for slug:", slug);
		return <div>Page not found</div>;
	} catch (error) {
		console.error("Error rendering dynamic page:", error);
		return <div>Error loading page</div>;
	}
}
