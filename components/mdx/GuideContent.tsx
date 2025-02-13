import { type ReactNode } from "react";
import { PostHeader } from "./PostHeader";
import RelatedPosts from "./RelatedPosts";

interface GuideContentProps {
	children: ReactNode;
	metadata: {
		title: string;
		description: string;
		date: string;
		readTime: string;
		author?: string;
		image?: string;
		keywords?: string[];
	};
	slug: string;
}

export async function GuideContent({ children, metadata, slug }: GuideContentProps) {
	return (
		<article className="container max-w-4xl mx-auto px-4">
			<PostHeader {...metadata} />
			<div className="mdx-content">{children}</div>
			{/* @ts-expect-error Async Server Component */}
			<RelatedPosts currentSlug={slug} currentKeywords={metadata.keywords || []} contentType="guides" />
		</article>
	);
}
