import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	images: {
		remotePatterns: [
			{
				protocol: "https" as const,
				hostname: "**",
			},
			{
				protocol: "https" as const,
				hostname: "localhost",
			},
			{
				protocol: "http" as const,
				hostname: "localhost",
			},
		],
	},
	experimental: {
		mdxRs: true,
		inlineCss: true,
		typedRoutes: true,
		reactCompiler: false,
		optimizeCss: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
	},
});

export default withMDX(nextConfig);
