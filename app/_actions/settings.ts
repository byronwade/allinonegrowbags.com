import { cache } from "react";
import { payload } from "@/payload";
import { Settings } from "@/payload-types";

export const getGlobalSettings = cache(async () => {
	try {
		const settings = await payload.find({
			collection: "settings",
			limit: 1,
		});

		if (!settings.docs[0]) {
			throw new Error("No settings found");
		}

		return settings.docs[0] as Settings;
	} catch (error) {
		console.error("Error fetching global settings:", error);
		throw error;
	}
});

export const getNavigationMenu = cache(async (location: "header" | "footer") => {
	try {
		const settings = await getGlobalSettings();
		const navigationId = settings[location]?.navigation;

		if (!navigationId) {
			return null;
		}

		const navigation = await payload.findByID({
			collection: "navigation",
			id: navigationId as string,
		});

		return navigation;
	} catch (error) {
		console.error(`Error fetching ${location} navigation:`, error);
		throw error;
	}
});
