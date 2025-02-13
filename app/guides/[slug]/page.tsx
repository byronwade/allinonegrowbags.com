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
	const posts = await getMDXPosts("guides");
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		return {};
	}

	return {
		title: `${post.title} | ZugzBag Growing Guides`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			authors: ["ZugzBag"],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
		},
	};
}

export default async function GuidePost({ params }: Props) {
	const posts = await getMDXPosts("guides");
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		notFound();
	}

	return <MDXContent post={post} />;
}
