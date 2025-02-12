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

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

// Define allowed origins for CORS and CSRF
const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:3001",
	"https://allinonegrowbags.com",
	"https://www.allinonegrowbags.com",
	serverURL,
];

export default buildConfig({
	serverURL,
	admin: {
		user: "users",
		meta: {
			titleSuffix: "- ZugzBag Admin",
		},
		components: {
			// Add block preview components
			beforeDashboard: [],
			afterDashboard: [],
		},
	},
	upload: {
		limits: {
			fileSize: 10000000, // 10MB
		},
	},
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
				media: {
					disableLocalStorage: true,
					disablePayloadAccessControl: true,
					generateFileURL: ({ filename }) => {
						try {
							if (!filename) return `${serverURL}/placeholder-image.jpg`;
							// Ensure the filename is properly encoded
							const encodedFilename = encodeURIComponent(filename);
							return `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${encodedFilename}`;
						} catch (error) {
							console.error("Error generating file URL:", error);
							return `${serverURL}/placeholder-image.jpg`;
						}
					},
				},
			},
			token: process.env.BLOB_READ_WRITE_TOKEN || "",
		}),
		seoPlugin({
			collections: ["pages", "posts", "guides"],
			uploadsCollection: "media",
			generateTitle: ({ doc }) => {
				try {
					if (!doc?.title) return "ZugzBag - All In One Grow Bags";
					return `${doc.title} | ZugzBag`;
				} catch (error) {
					console.error("Error generating SEO title:", error);
					return "ZugzBag - All In One Grow Bags";
				}
			},
			generateDescription: ({ doc }) => {
				try {
					return doc?.excerpt || doc?.description || "Premium all-in-one mushroom grow bags for cultivation enthusiasts.";
				} catch (error) {
					console.error("Error generating SEO description:", error);
					return "Premium all-in-one mushroom grow bags for cultivation enthusiasts.";
				}
			},
			generateImage: ({ doc }) => {
				try {
					if (doc?.featuredImage?.url) return doc.featuredImage.url;
					if (doc?.image?.url) return doc.image.url;
					return `${serverURL}/og-image.jpg`;
				} catch (error) {
					console.error("Error generating SEO image:", error);
					return `${serverURL}/og-image.jpg`;
				}
			},
			generateURL: ({ doc }) => {
				try {
					if (!doc?.slug) return serverURL;

					let prefix = "";
					// Add collection-specific prefixes based on doc type
					if (doc._collection === "posts") {
						prefix = "blog/";
					} else if (doc._collection === "guides") {
						prefix = "guides/";
					}

					// Handle home page
					const slug = doc.slug === "home" ? "" : doc.slug;
					const url = `${serverURL}/${prefix}${slug}`.replace(/\/+/g, "/");

					// Ensure URL ends with trailing slash for consistency
					return url.endsWith("/") ? url : `${url}/`;
				} catch (error) {
					console.error("Error generating SEO URL:", error);
					return serverURL;
				}
			},
			tabbedUI: true, // Enable tabbed interface for better organization
		}),
	],
	typescript: {
		outputFile: "payload-types.ts",
	},
	cors: allowedOrigins,
	csrf: allowedOrigins,
});
