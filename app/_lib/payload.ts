import type { Payload } from "payload";
import config from "../../payload.config";

declare global {
	// eslint-disable-next-line no-var
	var payload: {
		client: Payload | null;
		promise: Promise<Payload> | null;
	} | null;
}

// This is a singleton to ensure we only instantiate Payload once
if (!global.payload) {
	console.log("Initializing global payload singleton");
	global.payload = {
		client: null,
		promise: null,
	};
}

async function initPayloadClient(): Promise<Payload> {
	console.log("Starting payload client initialization");

	if (!process.env.PAYLOAD_SECRET) {
		console.error("Missing PAYLOAD_SECRET environment variable");
		throw new Error("PAYLOAD_SECRET environment variable is missing");
	}

	const cache = global.payload!;

	if (cache.client) {
		console.log("Returning cached payload client");
		return cache.client;
	}

	if (!cache.promise) {
		console.log("Creating new payload client");
		const { default: payload } = await import("payload");
		const resolvedConfig = await config;
		cache.promise = payload.init({
			config: resolvedConfig,
		});
	}

	try {
		console.log("Awaiting payload client initialization");
		cache.client = await cache.promise;
		console.log("Payload client initialized successfully");
	} catch (e: unknown) {
		console.error("Error initializing payload client:", e);
		cache.promise = null;
		throw e;
	}

	return cache.client;
}

// Initialize the client
console.log("Starting payload client initialization process");
const clientPromise = initPayloadClient();

// In development, attach to global to prevent hot reload from creating new instances
if (process.env.NODE_ENV === "development") {
	console.log("Development mode: attaching client promise to global");
	global.payload = { client: null, promise: clientPromise };
}

export const client = clientPromise;
