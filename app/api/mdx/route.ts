import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { mdxPosts, type Post } from "./data";

// Define route segment config
export const config = {
	runtime: "edge",
	regions: "auto",
	api: {
		bodyParser: false,
	},
};

const getCachedPosts = unstable_cache(
	async (contentType: "learn" | "guides") => {
		return mdxPosts[contentType];
	},
	["mdx-posts"],
	{
		revalidate: 3600,
		tags: ["mdx-posts"],
	}
);

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const contentType = searchParams.get("type") as "learn" | "guides";

	if (!contentType || !["learn", "guides"].includes(contentType)) {
		return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
	}

	const posts = await getCachedPosts(contentType);
	return NextResponse.json(posts);
}
