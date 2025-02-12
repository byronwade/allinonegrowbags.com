import payload from "payload";
import { cache } from "react";

export const getPayloadClient = cache(async () => {
	if (!process.env.PAYLOAD_SECRET) {
		throw new Error("PAYLOAD_SECRET environment variable is not set");
	}

	// Initialize Payload
	const payloadClient = await payload.init({
		secret: process.env.PAYLOAD_SECRET,
		local: true,
		db: {
			type: "postgres",
			url: process.env.POSTGRES_PRISMA_URL as string,
		},
	});

	return payloadClient;
});
