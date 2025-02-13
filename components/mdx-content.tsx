"use client";

import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";
import type { Post } from "@/lib/mdx";

export default function MDXContent({ post }: { post: Post }) {
	const components = useMDXComponents({});

	return (
		<article className="prose prose-invert prose-purple max-w-4xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
				<div className="flex items-center space-x-4 text-sm text-gray-400">
					<time dateTime={post.date}>
						{new Date(post.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					<span>{post.readTime}</span>
					{post.author && <span>By {post.author}</span>}
				</div>
			</div>
			<MDXProvider components={components}>
				<div className="mdx-content prose-headings:mt-8 prose-headings:mb-4">{post.content}</div>
			</MDXProvider>
		</article>
	);
}
