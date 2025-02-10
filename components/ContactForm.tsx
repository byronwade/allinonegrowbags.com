"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		try {
			setIsSubmitting(true);
			const result = await submitContactForm(formData);

			if (result.error) {
				toast({
					title: "Error",
					description: result.error,
					variant: "destructive",
				});
			} else {
				toast({
					title: "Message Sent!",
					description: "Thank you for contacting us. We'll get back to you soon!",
					variant: "success",
				});
				// Reset form
				const form = document.querySelector("form") as HTMLFormElement;
				form?.reset();
			}
		} catch {
			toast({
				title: "Error",
				description: "Failed to send message. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
			{/* Contact Form */}
			<div className="space-y-6">
				<h2 className="text-2xl font-semibold text-white">Send us a message</h2>
				<form action={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
							Name
						</label>
						<Input id="name" name="name" placeholder="Your name" required suppressHydrationWarning disabled={isSubmitting} />
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
							Email
						</label>
						<Input id="email" name="email" type="email" placeholder="your@email.com" required suppressHydrationWarning disabled={isSubmitting} />
					</div>
					<div>
						<label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
							Subject
						</label>
						<Input id="subject" name="subject" placeholder="What's this about?" required suppressHydrationWarning disabled={isSubmitting} />
					</div>
					<div>
						<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
							Message
						</label>
						<Textarea id="message" name="message" placeholder="Your message..." rows={6} className="min-h-[150px]" required suppressHydrationWarning disabled={isSubmitting} />
					</div>
					<Button type="submit" className="w-full bg-purple hover:bg-purple-dark" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Sending...
							</>
						) : (
							"Send Message"
						)}
					</Button>
				</form>
			</div>

			{/* Contact Information */}
			<div className="space-y-8">
				<h2 className="text-2xl font-semibold text-white">Contact Information</h2>
				<div className="space-y-6">
					<div className="flex items-start space-x-4">
						<MapPin className="w-6 h-6 text-purple mt-1" />
						<div>
							<h3 className="font-medium text-white">Address</h3>
							<p className="text-gray-300">
								123 Mushroom Street
								<br />
								Mycelium City, MC 12345
								<br />
								United States
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<Phone className="w-6 h-6 text-purple mt-1" />
						<div>
							<h3 className="font-medium text-white">Phone</h3>
							<p className="text-gray-300">(555) 123-4567</p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<Mail className="w-6 h-6 text-purple mt-1" />
						<div>
							<h3 className="font-medium text-white">Email</h3>
							<p className="text-gray-300">zugzology@gmail.com</p>
						</div>
					</div>
				</div>

				<div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mt-8">
					<h3 className="text-xl font-semibold text-white mb-4">Business Hours</h3>
					<ul className="space-y-2 text-gray-300">
						<li className="flex justify-between">
							<span>Monday - Friday:</span>
							<span>9:00 AM - 6:00 PM EST</span>
						</li>
						<li className="flex justify-between">
							<span>Saturday:</span>
							<span>10:00 AM - 4:00 PM EST</span>
						</li>
						<li className="flex justify-between">
							<span>Sunday:</span>
							<span>Closed</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
