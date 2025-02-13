import { notFound } from "next/navigation";
import { getMDXPosts } from "@/lib/mdx";
import MDXContent from "@/components/mdx-content";
import type { Metadata } from "next";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const posts = await getMDXPosts("learn");
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		return {};
	}

	return {
		title: `${post.title} | ZugzBag`,
		description: post.description,
		keywords: post.keywords,
		authors: post.author ? [{ name: post.author }] : undefined,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			authors: post.author ? [post.author] : undefined,
			images: post.image ? [post.image] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: post.image ? [post.image] : undefined,
		},
	};
}

export default async function LearnPost({ params }: Props) {
	const posts = await getMDXPosts("learn");
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		notFound();
	}

	return <MDXContent post={post} />;
}
