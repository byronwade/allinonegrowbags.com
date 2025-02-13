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
			console.log(`Searching for posts in: ${postsDirectory}`);

			if (!fs.existsSync(postsDirectory)) {
				console.warn(`Directory not found: ${postsDirectory}`);
				return [];
			}

			// Recursively get all MDX files
			function getAllMDXFiles(dir: string): string[] {
				const entries = fs.readdirSync(dir, { withFileTypes: true });
				console.log(`Found ${entries.length} entries in ${dir}`);

				return entries.reduce<string[]>((files, entry) => {
					const fullPath = path.join(dir, entry.name);

					if (entry.isDirectory() && !entry.name.startsWith("_") && !entry.name.startsWith(".") && !entry.name.startsWith("[")) {
						return [...files, ...getAllMDXFiles(fullPath)];
					} else if (entry.isFile() && entry.name === "page.mdx") {
						console.log(`Found MDX file: ${fullPath}`);
						return [...files, fullPath];
					}

					return files;
				}, []);
			}

			const mdxFiles = getAllMDXFiles(postsDirectory);
			console.log(`Total MDX files found: ${mdxFiles.length}`);

			const allPosts = await Promise.all(
				mdxFiles.map(async (filePath) => {
					try {
						const source = fs.readFileSync(filePath, "utf8");
						const relativePath = path.relative(path.join(process.cwd(), "app"), filePath);
						const slug = path.dirname(relativePath).split(path.sep).slice(1).join("/");
						console.log(`Processing: ${slug}`);

						// First, compile the MDX content
						const { content } = await compileMDX({
							source,
							options: {
								parseFrontmatter: false,
							},
						});

						// Extract metadata from the source directly
						const metadataMatch = source.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?});/);
						if (!metadataMatch) {
							console.warn(`No metadata found in ${filePath}`);
							return null;
						}

						// Safely evaluate the metadata object
						const metadata = eval(`(${metadataMatch[1]})`);

						if (!metadata?.title || !metadata?.description || !metadata?.date || !metadata?.readTime) {
							console.warn(`Missing required metadata in ${filePath}`);
							return null;
						}

						return {
							slug,
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
			console.log(`Found ${validPosts.length} valid posts`);
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
