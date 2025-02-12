import { NextRequest } from "next/server";
import { list } from "@vercel/blob";

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
	try {
		const filename = decodeURIComponent(params.filename);
		const { blobs } = await list({ prefix: `media/${filename}` });
		const blob = blobs[0];

		if (!blob) {
			return new Response("File not found", { status: 404 });
		}

		// Cache the response for 1 hour
		const headers = {
			"Content-Type": blob.uploadedAt ? "image/webp" : "application/octet-stream", // Default to webp since that's what we're using
			"Cache-Control": "public, max-age=3600",
		};

		const response = await fetch(blob.url);
		return new Response(response.body, { headers });
	} catch (error) {
		console.error("Error serving media file:", error);
		return new Response("Error serving media file", { status: 500 });
	}
}
