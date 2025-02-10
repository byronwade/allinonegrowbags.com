import Client from "shopify-buy";

// Initialize the client
const client = Client.buildClient({
	domain: "zugz.myshopify.com",
	storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
});

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
