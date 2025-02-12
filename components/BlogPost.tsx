import { format } from "date-fns";
import Image from "next/image";
import { Block } from "payload/types";
import BlockRenderer from "./BlockRenderer";

interface BlogPostProps {
	title: string;
	publishedAt: string;
	category: string;
	featuredImage: {
		url: string;
		alt: string;
	};
	content: Block[];
	excerpt: string;
}

export default function BlogPost({ title, publishedAt, category, featuredImage, content, excerpt }: BlogPostProps) {
	return (
		<article className="container mx-auto px-4 py-8 md:py-12">
			{/* Header */}
			<header className="max-w-4xl mx-auto mb-8 md:mb-12">
				<div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
					<time dateTime={publishedAt}>{format(new Date(publishedAt), "MMMM d, yyyy")}</time>
					<span>•</span>
					<span>{category}</span>
				</div>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{title}</h1>
				<p className="text-xl text-gray-300">{excerpt}</p>
			</header>

			{/* Featured Image */}
			<div className="max-w-4xl mx-auto mb-8 md:mb-12 relative aspect-[16/9]">
				<Image src={featuredImage.url} alt={featuredImage.alt} fill className="object-cover rounded-lg" priority />
			</div>

			{/* Content */}
			<div className="max-w-4xl mx-auto">
				<BlockRenderer blocks={content} />
			</div>

			{/* Schema.org Article markup */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Article",
						headline: title,
						image: [featuredImage.url],
						datePublished: publishedAt,
						dateModified: publishedAt,
						author: {
							"@type": "Organization",
							name: "ZugzBag",
							url: "https://www.allinonegrowbags.com",
						},
					}),
				}}
			/>
		</article>
	);
}
