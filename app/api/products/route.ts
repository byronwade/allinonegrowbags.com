import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Define route segment config
export const config = {
	runtime: "edge",
	regions: "auto",
	api: {
		bodyParser: false,
	},
};

const SHOPIFY_DOMAIN = "zugz.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

interface ShopifyProduct {
	node: {
		id: string;
		title: string;
		handle: string;
		images: {
			edges: Array<{
				node: {
					url: string;
					altText: string;
					width: number;
					height: number;
				};
			}>;
		};
		variants: {
			edges: Array<{
				node: {
					id: string;
					title: string;
					price: {
						amount: string;
					};
					availableForSale: boolean;
				};
			}>;
		};
	};
}

const TARGET_PRODUCT_TITLE = "Sterile All-in-One Mushroom Grow Bag – 4 lbs Substrate & Grain with Filter Patch";

export const runtime = "edge";
export const dynamic = "error";
export const fetchCache = "force-cache";
export const preferredRegion = "auto";
export const revalidate = 3600; // 1 hour

const getProductsWithCache = unstable_cache(
	async () => {
		const query = `
            {
                products(first: 20) {
                    edges {
                        node {
                            id
                            title
                            handle
                            images(first: 10) {
                                edges {
                                    node {
                                        url
                                        altText
                                        width
                                        height
                                    }
                                }
                            }
                            variants(first: 10) {
                                edges {
                                    node {
                                        id
                                        title
                                        price {
                                            amount
                                        }
                                        availableForSale
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

		const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN || "",
			},
			body: JSON.stringify({ query }),
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch products: ${response.statusText}`);
		}

		const { data, errors } = await response.json();

		if (errors?.length > 0) {
			throw new Error(errors[0].message);
		}

		return data;
	},
	["products"],
	{
		revalidate: 3600,
		tags: ["products"],
	}
);

export async function GET() {
	try {
		const data = await getProductsWithCache();

		// Log all products for debugging
		console.log(
			"All products:",
			data.products.edges.map((p: ShopifyProduct) => ({
				title: p.node.title,
				variants: p.node.variants.edges.map((v) => ({
					id: v.node.id,
					title: v.node.title,
					availableForSale: v.node.availableForSale,
				})),
			}))
		);

		// Find the exact product we're looking for
		const products = data.products.edges as ShopifyProduct[];
		let foundProduct = products.find((p) => p.node.title.toLowerCase() === TARGET_PRODUCT_TITLE.toLowerCase());

		if (!foundProduct) {
			// If exact match not found, try partial match
			foundProduct = products.find((p) => p.node.title.toLowerCase().includes("grow bag") && p.node.title.toLowerCase().includes("4 lbs"));

			if (!foundProduct) {
				throw new Error("Target product not found");
			}

			console.log("Found product by partial match:", foundProduct.node.title);
		} else {
			console.log("Found exact product match:", foundProduct.node.title);
		}

		const availableVariant = foundProduct.node.variants.edges.find((v) => v.node.availableForSale);

		if (!availableVariant) {
			throw new Error("No available variants found for the target product");
		}

		console.log("Using variant:", availableVariant.node);

		// Get the first image as the main product image
		const images = foundProduct.node.images.edges.map((edge) => ({
			url: edge.node.url,
			altText: edge.node.altText || foundProduct.node.title,
			width: edge.node.width,
			height: edge.node.height,
		}));

		// Return product information including images and base price
		return NextResponse.json({
			product: {
				id: foundProduct.node.id,
				title: foundProduct.node.title,
				handle: foundProduct.node.handle,
				images,
				variant: {
					id: availableVariant.node.id,
					title: availableVariant.node.title,
					price: availableVariant.node.price.amount,
				},
			},
		});
	} catch (error) {
		console.error("Product fetch error:", error);
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Failed to fetch products",
			},
			{ status: 500 }
		);
	}
}
