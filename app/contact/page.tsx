import ContactForm from "@/components/ContactForm";

export const metadata = {
	title: "Contact Us | ZugzBag",
	description: "Get in touch with us for any questions about our all-in-one mushroom grow bags or bulk orders.",
};

export default function ContactPage() {
	return (
		<main className="flex-1">
			<div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
					<p className="text-gray-300 text-lg">Have questions about our grow bags or need assistance? We&apos;re here to help!</p>
				</div>
				<ContactForm />
			</div>
		</main>
	);
}
