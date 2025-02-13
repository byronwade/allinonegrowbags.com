import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { unstable_cache } from "next/cache";

export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	author?: string;
	image?: string;
	keywords?: string[];
	content: React.ReactNode;
};

export async function getMDXPosts(contentType: "learn" | "guides") {
	const getPosts = unstable_cache(
		async () => {
			const postsDirectory = path.join(process.cwd(), "app", contentType);

			if (!fs.existsSync(postsDirectory)) {
				console.warn(`Directory not found: ${postsDirectory}`);
				return [];
			}

			const posts = fs.readdirSync(postsDirectory);

			const allPosts = await Promise.all(
				posts
					.filter((file) => {
						const fullPath = path.join(postsDirectory, file);
						return fs.statSync(fullPath).isDirectory() && !file.startsWith("_") && !file.startsWith(".") && !file.startsWith("[");
					})
					.map(async (dir) => {
						const filePath = path.join(postsDirectory, dir, "page.mdx");

						if (!fs.existsSync(filePath)) {
							console.warn(`No page.mdx found in ${dir}`);
							return null;
						}

						try {
							const source = fs.readFileSync(filePath, "utf8");

							// First, compile the MDX content
							const { content } = await compileMDX({
								source,
								options: {
									parseFrontmatter: false,
								},
							});

							// Then, dynamically import the metadata
							const mdxModule = await import(`@/app/${contentType}/${dir}/page.mdx`);
							const metadata = mdxModule.metadata;

							if (!metadata?.title || !metadata?.description || !metadata?.date || !metadata?.readTime) {
								console.warn(`Missing required metadata in ${filePath}`);
								return null;
							}

							return {
								slug: dir,
								title: metadata.title,
								description: metadata.description,
								date: metadata.date,
								readTime: metadata.readTime,
								author: metadata.author,
								image: metadata.image,
								keywords: metadata.keywords,
								content,
							} satisfies Post;
						} catch (error) {
							console.error(`Error processing ${filePath}:`, error);
							return null;
						}
					})
			);

			const validPosts = allPosts.filter((post): post is NonNullable<typeof post> => post !== null);
			return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		},
		[`${contentType}-posts`],
		{
			revalidate: 3600,
			tags: [`${contentType}-posts`],
		}
	);

	return getPosts();
}
