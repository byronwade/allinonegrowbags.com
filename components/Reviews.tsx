"use client";

import { useState } from "react";
import { Star, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { submitReview } from "@/app/_actions/reviews";
import { ReviewsList } from "./ReviewsList";

interface ReviewFormData {
	customerName: string;
	email: string;
	rating: number;
	reviewText: string;
	images: string[];
}

export default function Reviews() {
	const { toast } = useToast();
	const [formData, setFormData] = useState<ReviewFormData>({
		customerName: "",
		email: "",
		rating: 0,
		reviewText: "",
		images: [],
	});
	const [hoveredRating, setHoveredRating] = useState(0);
	const [images, setImages] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const remainingSlots = 5 - images.length;
		const newFiles = files.slice(0, remainingSlots);

		const newImages = [...images, ...newFiles];
		setImages(newImages);

		const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
		setPreviewUrls([...previewUrls, ...newPreviewUrls]);
	};

	const removeImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		setImages(newImages);

		const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
		newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
		setPreviewUrls(newPreviewUrls);
	};

	const resetForm = () => {
		setFormData({
			customerName: "",
			email: "",
			rating: 0,
			reviewText: "",
			images: [],
		});
		setImages([]);
		setPreviewUrls((prev) => {
			prev.forEach((url) => URL.revokeObjectURL(url));
			return [];
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.customerName || !formData.rating || !formData.reviewText) {
			toast({
				title: "Error",
				description: "Please fill in all required fields",
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);

		try {
			// Upload images if any
			const uploadedImageUrls: string[] = [];
			if (images.length > 0) {
				// Here you would implement image upload logic
				// For now, we'll skip this part
			}

			const result = await submitReview({
				customerName: formData.customerName,
				rating: formData.rating,
				reviewText: formData.reviewText,
				purchasedProduct: "All-in-One Grow Bag", // Default product
				customerLocation: "", // Optional
				customerImage: uploadedImageUrls[0], // Optional, first image as avatar
			});

			if (result.success) {
				toast({
					title: "Success",
					description: "Your review has been submitted and is pending approval",
				});
				resetForm();
			} else {
				throw new Error(result.error || "Failed to submit review");
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to submit review. Please try again later.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-16 px-4" id="reviews">
			<div className="container mx-auto max-w-4xl">
				<h2 className="text-3xl font-bold mb-8 text-white">Customer Feedback</h2>

				{/* Reviews List */}
				<ReviewsList />

				{/* Review Form */}
				<Card className="p-6 rounded-xl">
					<h3 className="text-2xl font-bold mb-6">Submit Your Review</h3>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<label className="block text-sm font-medium mb-2">Add Your Rating*</label>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<button key={star} type="button" onMouseEnter={() => setHoveredRating(star)} onMouseLeave={() => setHoveredRating(0)} onClick={() => setFormData({ ...formData, rating: star })} className="focus:outline-none rounded-lg">
										<Star className={`w-8 h-8 ${star <= (hoveredRating || formData.rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
									</button>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-2">
									Name*
								</label>
								<Input id="name" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} placeholder="John Doe" required />
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2">
									Email*
								</label>
								<Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" required />
							</div>
						</div>
						<div>
							<label htmlFor="review" className="block text-sm font-medium mb-2">
								Write Your Review*
							</label>
							<Textarea id="review" value={formData.reviewText} onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })} placeholder="Share your experience..." rows={4} required />
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Upload Images (Optional)</label>
							<div className="grid grid-cols-5 gap-2 mb-2">
								{[...Array(5)].map((_, index) => (
									<div key={index} className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative overflow-hidden">
										{previewUrls[index] ? (
											<>
												<Image src={previewUrls[index]} alt={`Preview ${index + 1}`} fill className="object-cover rounded-lg" />
												<button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-background">
													<X className="w-4 h-4" />
												</button>
											</>
										) : (
											<Upload className="w-6 h-6 text-muted-foreground" />
										)}
									</div>
								))}
							</div>
							<Input type="file" accept="image/*" multiple className="hidden" id="image-upload" onChange={handleImageUpload} />
							<Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()} className="w-full rounded-lg">
								Upload Images (Max 5)
							</Button>
						</div>
						<Button type="submit" className="w-full bg-purple hover:bg-purple-dark rounded-lg" disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Leave Feedback"}
						</Button>
					</form>
				</Card>
			</div>
		</section>
	);
}
