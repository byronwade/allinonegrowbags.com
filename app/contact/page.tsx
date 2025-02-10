import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
	title: "Contact Us | ZugzBag - All-in-One Mushroom Grow Bags",
	description: "Get in touch with ZugzBag for questions about our all-in-one mushroom grow bags, bulk orders, or general inquiries. We're here to help!",
	openGraph: {
		title: "Contact ZugzBag",
		description: "Get in touch with us for any questions about our all-in-one mushroom grow bags.",
	},
};

export default function Contact() {
	return (
		<main className="min-h-screen bg-background">
			<div className="hero-pattern py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">Contact Us</h1>
					<p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">Have questions about our all-in-one mushroom grow bags? We&apos;re here to help! Fill out the form below or use our contact information.</p>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<ContactForm />
			</div>
		</main>
	);
}
