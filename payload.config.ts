import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

// Collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Guides } from "./collections/Guides";
import { Reviews } from "./collections/Reviews";
import { Settings } from "./collections/Settings";
import { Navigation } from "./collections/Navigation";

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
	secret: process.env.PAYLOAD_SECRET || "",
	editor: lexicalEditor({}),
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL,
		},
	}),
	collections: [Users, Media, Pages, Posts, Guides, Reviews, Settings, Navigation],
	plugins: [
		vercelBlobStorage({
			enabled: true,
			collections: {
				media: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN || "",
		}),
		seoPlugin({
			collections: ["pages"],
			uploadsCollection: "media",
			generateTitle: ({ doc }) => doc.title || "All In One Grow Bags",
			generateDescription: ({ doc }) => doc.excerpt || "",
			generateImage: ({ doc }) => doc.featuredImage?.url || "/og-image.jpg",
			generateURL: ({ doc }) => `https://allinonegrowbags.com/${doc.slug}`,
		}),
	],
	typescript: {
		outputFile: "payload-types.ts",
	},
	cors: ["http://localhost:3000"],
	csrf: ["http://localhost:3000"],
});
