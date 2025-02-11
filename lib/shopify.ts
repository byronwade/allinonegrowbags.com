import Client from "shopify-buy";

// Initialize the client with the correct configuration
const client = Client.buildClient({
	domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "zugz.myshopify.com",
	storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
	apiVersion: '2024-01' // Add the latest API version
});

// Product ID for the All-in-One Grow Bag (this should be the GraphQL ID format)
export const GROW_BAG_PRODUCT_ID = "gid://shopify/Product/7264768655420";

// Create a checkout
export const createCheckout = async (variantId: string, quantity: number, customAttributes: any) => {
	try {
		// Create a checkout
		const checkout = await client.checkout.create();

		// Add line items to the checkout
		const lineItemsToAdd = [
			{
				variantId,
				quantity,
				customAttributes,
			},
		];

		await client.checkout.addLineItems(checkout.id, lineItemsToAdd);

		return checkout.webUrl;
	} catch (error) {
		console.error("Error creating checkout:", error);
		throw error;
	}
};

// Get product pricing
export const getProductPricing = async () => {
	try {
		// First try to fetch the product
		const product = await client.product.fetch(GROW_BAG_PRODUCT_ID);
		
		if (!product || !product.variants || !product.variants[0]) {
			console.warn("Product or variant not found, using default values");
			return {
				price: 24.95,
				compareAtPrice: 29.99,
			};
		}

		const variant = product.variants[0];
		
		// Ensure we're getting numeric values
		const price = typeof variant.price === 'string' ? parseFloat(variant.price) : variant.price;
		const compareAtPrice = variant.compareAtPrice ? 
			(typeof variant.compareAtPrice === 'string' ? parseFloat(variant.compareAtPrice) : variant.compareAtPrice) 
			: null;

		return {
			price: price || 24.95, // Fallback to default if parsing fails
			compareAtPrice: compareAtPrice || 29.99, // Fallback to default if parsing fails
		};
	} catch (error) {
		console.error("Error fetching product pricing:", error);
		// Return default values if fetch fails
		return {
			price: 24.95,
			compareAtPrice: 29.99,
		};
	}
};

// Get product by handle
export const getProduct = async (handle: string) => {
	try {
		return await client.product.fetchByHandle(handle);
	} catch (error) {
		console.error("Error fetching product:", error);
		throw error;
	}
};

export default client;
