import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMDXPosts } from "@/lib/mdx";
import type { Route } from "next";

export const metadata = {
	title: "Learn About Mushroom Growing | ZugzBag",
	description: "Discover everything you need to know about growing mushrooms with our comprehensive guides and tutorials.",
};

export default async function LearnPage() {
	const posts = await getMDXPosts("learn");

	return (
		<div className="container mx-auto px-4 py-12">
			{/* Page Header */}
			<div className="mb-12">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Learn About Mushroom Growing</h1>
					<p className="text-gray-300 text-lg">Expand your knowledge with our comprehensive resources on mushroom cultivation.</p>
				</div>
			</div>

			{/* Posts List */}
			{posts.length === 0 ?
				<div className="text-center text-gray-400 py-12">
					<p>No learning resources available yet. Check back soon!</p>
				</div>
			:	<div className="max-w-4xl mx-auto space-y-8">
					{posts.map((post) => (
						<article key={post.slug} className="bg-secondary/50 backdrop-blur-sm border border-purple/20 rounded-lg p-6 hover:border-purple/40 transition-colors">
							<Link href={`/learn/${post.slug}` as Route} className="block no-underline space-y-4">
								<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
									<h2 className="text-2xl font-semibold text-white hover:text-purple transition-colors m-0">{post.title}</h2>
									<div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
										<time dateTime={post.date}>
											{new Date(post.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</time>
										<span>{post.readTime}</span>
									</div>
								</div>
								<p className="text-gray-300">{post.description}</p>
								<div>
									<Button variant="link" className="text-purple hover:text-purple-dark p-0">
										Read More →
									</Button>
								</div>
							</Link>
						</article>
					))}
				</div>
			}
		</div>
	);
}
