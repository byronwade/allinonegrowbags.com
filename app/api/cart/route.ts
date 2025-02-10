import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = "zugz.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const TARGET_PRODUCT_TITLE = "Sterile All-in-One Mushroom Grow Bag – 4 lbs Substrate & Grain with Filter Patch";

interface CartItem {
	quantity: number;
	properties?: Record<string, string>;
}

interface ProductData {
	variant: {
		id: string;
		price: string;
	};
	images: Array<{
		url: string;
		altText: string;
	}>;
}

function getTierDiscount(quantity: number): { percentage: number; code: string } {
	if (quantity >= 50) return { percentage: 40, code: "50TIER" };
	if (quantity >= 20) return { percentage: 35, code: "20TIER" };
	if (quantity >= 10) return { percentage: 30, code: "10TIER" };
	if (quantity >= 5) return { percentage: 25, code: "5TIER" };
	if (quantity >= 2) return { percentage: 15, code: "2TIER" };
	return { percentage: 0, code: "" };
}

async function fetchProductData(): Promise<ProductData> {
	const query = `
		{
			products(first: 20) {
				edges {
					node {
						id
						title
						images(first: 10) {
							edges {
								node {
									url
									altText
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
		throw new Error("Failed to fetch product data");
	}

	const { data, errors } = await response.json();

	if (errors?.length > 0) {
		throw new Error(errors[0].message);
	}

	const products = data.products.edges;
	const foundProduct = products.find((p: any) => p.node.title.toLowerCase() === TARGET_PRODUCT_TITLE.toLowerCase() || (p.node.title.toLowerCase().includes("grow bag") && p.node.title.toLowerCase().includes("4 lbs")));

	if (!foundProduct) {
		throw new Error("Product not found");
	}

	const availableVariant = foundProduct.node.variants.edges.find((v: any) => v.node.availableForSale);
	if (!availableVariant) {
		throw new Error("No available variants found");
	}

	const images = foundProduct.node.images.edges.map((edge: any) => ({
		url: edge.node.url,
		altText: edge.node.altText || foundProduct.node.title,
	}));

	return {
		variant: {
			id: availableVariant.node.id,
			price: availableVariant.node.price.amount,
		},
		images,
	};
}

async function createCart(items: CartItem[]) {
	const cartCreateMutation = `
		mutation cartCreate($input: CartInput!) {
			cartCreate(input: $input) {
				cart {
					id
					checkoutUrl
				}
				userErrors {
					field
					message
				}
			}
		}
	`;

	try {
		// Fetch current product data including price and images
		const productData = await fetchProductData();
		const basePrice = parseFloat(productData.variant.price);

		// Calculate discount and final price
		const item = items[0];
		const { percentage, code } = getTierDiscount(item.quantity);
		const discountAmount = (basePrice * percentage) / 100;
		const finalPrice = basePrice - discountAmount;
		const totalSavings = discountAmount * item.quantity;

		// Create cart with discount information in attributes
		console.log("Creating cart with discount:", { percentage, finalPrice, totalSavings, images: productData.images });
		const cartResponse = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN || "",
			},
			body: JSON.stringify({
				query: cartCreateMutation,
				variables: {
					input: {
						lines: [
							{
								merchandiseId: productData.variant.id,
								quantity: item.quantity,
								attributes: [
									{
										key: "_savings_amount",
										value: totalSavings.toFixed(2),
									},
									{
										key: "_product_image",
										value: productData.images[0]?.url || "",
									},
									...(item.properties
										? Object.entries(item.properties).map(([key, value]) => ({
												key,
												value: String(value),
										  }))
										: []),
								],
							},
						],
					},
				},
			}),
		});

		if (!cartResponse.ok) {
			throw new Error(`Failed to create cart: ${cartResponse.statusText}`);
		}

		const { data: cartData, errors: cartErrors } = await cartResponse.json();
		console.log("Cart creation response:", cartData);

		if (cartErrors?.length > 0) {
			console.error("Cart creation GraphQL errors:", cartErrors);
			throw new Error(cartErrors[0].message);
		}

		if (cartData?.cartCreate?.userErrors?.length > 0) {
			console.error("Cart creation user errors:", cartData.cartCreate.userErrors);
			throw new Error(cartData.cartCreate.userErrors[0].message);
		}

		// Add discount code to checkout URL if applicable
		let checkoutUrl = cartData.cartCreate.cart.checkoutUrl;
		if (code) {
			const separator = checkoutUrl.includes("?") ? "&" : "?";
			checkoutUrl = `${checkoutUrl}${separator}discount=${code}`;
		}

		return {
			cart: {
				...cartData.cartCreate.cart,
				checkoutUrl,
				productImage: productData.images[0]?.url,
				basePrice,
				finalPrice,
				savings: totalSavings,
			},
		};
	} catch (error) {
		console.error("Cart operation error:", error);
		throw error;
	}
}

export async function POST(request: Request) {
	try {
		const { action, items } = await request.json();
		console.log("Received cart request:", { action, items });

		if (action === "add") {
			const result = await createCart(items);

			if (!result?.cart?.checkoutUrl) {
				throw new Error("Failed to get checkout URL");
			}

			console.log("Cart creation successful, returning cart data");
			return NextResponse.json(result.cart);
		}

		return NextResponse.json({ error: "Invalid action" }, { status: 400 });
	} catch (error) {
		console.error("Cart operation error:", error);
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Cart operation failed",
			},
			{ status: 500 }
		);
	}
}
