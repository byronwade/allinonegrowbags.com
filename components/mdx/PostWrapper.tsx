"use client";

import { type ReactNode } from "react";
import RelatedPosts from "./RelatedPosts";

interface PostWrapperProps {
	children: ReactNode;
	slug: string;
	keywords: string[];
	contentType: "guides" | "learn";
}

export function PostWrapper({ children, slug, keywords, contentType }: PostWrapperProps) {
	return (
		<>
			<div className="mdx-content">{children}</div>
			{/* @ts-expect-error Async Server Component */}
			<RelatedPosts currentSlug={slug} currentKeywords={keywords} contentType={contentType} />
		</>
	);
}
