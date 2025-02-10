"use server";

import { sendEmail } from "./email";

export async function submitContactForm(formData: FormData) {
	try {
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const subject = formData.get("subject") as string;
		const message = formData.get("message") as string;

		// Validate form data
		if (!name || !email || !subject || !message) {
			throw new Error("All fields are required");
		}

		// Send email
		await sendEmail({
			to: "zugzology@gmail.com",
			subject: `New Contact Form Submission: ${subject}`,
			html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
		});

		return { success: true };
	} catch (error) {
		console.error("Form submission error:", error);
		return { error: error instanceof Error ? error.message : "Failed to submit form" };
	}
}
