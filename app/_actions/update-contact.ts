"use server";

import { updateContactPage } from "./pages";

export async function updateContact() {
	try {
		await updateContactPage();
		return { success: true };
	} catch (error) {
		console.error("Error in updateContact action:", error);
		return { success: false, error: "Failed to update contact page" };
	}
}
