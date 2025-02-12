import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { getPayloadClient } from "@/lib/payload";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const payload = await getPayloadClient();
	const post = await payload.find({
		collection: "posts",
		where: {
			slug: {
				equals: params.slug,
			},
		},
	});

	if (!post.docs[0]) {
		return {
			title: "Post Not Found | ZugzBag",
			description: "The requested blog post could not be found.",
		};
	}

	const { title, excerpt } = post.docs[0];

	return {
		title: `${title} | ZugzBag Blog`,
		description: excerpt,
	};
}

export default async function BlogPostPage({ params }: Props) {
	const payload = await getPayloadClient();
	const post = await payload.find({
		collection: "posts",
		where: {
			slug: {
				equals: params.slug,
			},
		},
	});

	if (!post.docs[0]) {
		notFound();
	}

	const { title, publishedAt, category, featuredImage, content, excerpt } = post.docs[0];

	return <BlogPost title={title} publishedAt={publishedAt} category={category} featuredImage={featuredImage} content={content} excerpt={excerpt} />;
}
