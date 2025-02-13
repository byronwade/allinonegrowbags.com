import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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

async function getMDXPosts(contentType: "learn" | "guides") {
	const postsDirectory = path.join(process.cwd(), "app", contentType);

	if (!fs.existsSync(postsDirectory)) {
		console.warn(`Directory not found: ${postsDirectory}`);
		return [];
	}

	// Recursively get all MDX files
	function getAllMDXFiles(dir: string): string[] {
		const entries = fs.readdirSync(dir, { withFileTypes: true });

		return entries.reduce<string[]>((files, entry) => {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory() && !entry.name.startsWith("_") && !entry.name.startsWith(".") && !entry.name.startsWith("[")) {
				return [...files, ...getAllMDXFiles(fullPath)];
			} else if (entry.isFile() && entry.name === "page.mdx") {
				return [...files, fullPath];
			}

			return files;
		}, []);
	}

	const mdxFiles = getAllMDXFiles(postsDirectory);

	const allPosts = await Promise.all(
		mdxFiles.map(async (filePath) => {
			try {
				const source = fs.readFileSync(filePath, "utf8");
				const relativePath = path.relative(path.join(process.cwd(), "app"), filePath);
				const slug = path.dirname(relativePath).split(path.sep).slice(1).join("/");

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
				} satisfies Omit<Post, "content">;
			} catch (error) {
				console.error(`Error processing ${filePath}:`, error);
				return null;
			}
		})
	);

	const validPosts = allPosts.filter((post): post is NonNullable<typeof post> => post !== null);
	return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const getCachedPosts = unstable_cache(getMDXPosts, ["mdx-posts"], {
	revalidate: 3600,
	tags: ["mdx-posts"],
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const contentType = searchParams.get("type") as "learn" | "guides";

	if (!contentType || !["learn", "guides"].includes(contentType)) {
		return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
	}

	const posts = await getCachedPosts(contentType);
	return NextResponse.json(posts);
}
