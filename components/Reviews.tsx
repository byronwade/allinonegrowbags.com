"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialReviews = [
	{
		id: 1,
		name: "John Smith",
		avatar: "/placeholder.svg?height=40&width=40",
		review: "These all-in-one grow bags provide incredible results. The substrate quality is perfect, and the filter patch ensures optimal air exchange. I've had consistent success with various mushroom species.",
		rating: 5,
		date: "2024-01-15",
		likes: 24,
		dislikes: 2,
		images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
	},
	{
		id: 2,
		name: "Sarah Davis",
		avatar: "/placeholder.svg?height=40&width=40",
		review: "As a commercial grower, I appreciate the consistency and quality of ZugzBag. The 4 lbs substrate is perfect for larger yields, and the bulk discounts make it cost-effective for my business.",
		rating: 5,
		date: "2024-01-10",
		likes: 18,
		dislikes: 1,
		images: ["/placeholder.svg?height=100&width=100"],
	},
	{
		id: 3,
		name: "Mike Wilson",
		avatar: "/placeholder.svg?height=40&width=40",
		review: "Perfect for beginners! The all-in-one system made my first mushroom growing experience successful. Great instructions and quality materials.",
		rating: 4,
		date: "2024-01-05",
		likes: 12,
		dislikes: 0,
		images: [],
	},
];

const ratingDistribution = [
	{ stars: 5, percentage: 90 },
	{ stars: 4, percentage: 60 },
	{ stars: 3, percentage: 40 },
	{ stars: 2, percentage: 30 },
	{ stars: 1, percentage: 10 },
];

export default function Reviews() {
	const [reviews] = useState(initialReviews);
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [images, setImages] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

	const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
	const totalReviews = reviews.length;

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// ... existing submit logic ...
		setImages([]);
		setPreviewUrls((prev) => {
			prev.forEach((url) => URL.revokeObjectURL(url));
			return [];
		});
	};

	return (
		<section className="py-16 px-4" id="reviews">
			<div className="container mx-auto max-w-4xl">
				<h2 className="text-3xl font-bold mb-8 text-white">Customer Feedback</h2>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
					{/* Rating Distribution */}
					<div className="md:col-span-6 space-y-2">
						{ratingDistribution.map(({ stars, percentage }) => (
							<div key={stars} className="flex items-center gap-2">
								<span className="w-8 text-sm text-muted-foreground">{stars} ★</span>
								<Progress value={percentage} className="h-2" />
								<span className="w-12 text-sm text-muted-foreground">{percentage}%</span>
							</div>
						))}
					</div>

					{/* Summary Stats */}
					<div className="md:col-span-6 grid grid-cols-2 gap-4">
						<Card className="p-4 rounded-xl">
							<CardContent className="p-0">
								<h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
								<p className="text-3xl font-bold">{totalReviews}+</p>
							</CardContent>
						</Card>
						<Card className="p-4 rounded-xl">
							<CardContent className="p-0">
								<h3 className="text-lg font-semibold mb-2">Average Rating</h3>
								<div className="flex items-center gap-2">
									<p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
									<div className="flex">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Reviews List */}
				<div className="space-y-6 mb-12">
					{reviews.map((review) => (
						<Card key={review.id} className="p-6 rounded-xl">
							<div className="flex items-start gap-4">
								<Avatar>
									<AvatarImage src={review.avatar} alt={review.name} />
									<AvatarFallback>
										{review.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-semibold">{review.name}</h3>
										<span className="text-sm text-muted-foreground">{review.date}</span>
									</div>
									<div className="flex mb-2">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star key={star} className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
										))}
									</div>
									<p className="text-sm text-muted-foreground mb-4">{review.review}</p>
									{review.images.length > 0 && (
										<div className="flex gap-2 mb-4">
											{review.images.map((image, index) => (
												<Image key={index} src={image || "/placeholder.svg"} alt={`Review image ${index + 1}`} width={100} height={100} className="rounded-lg object-cover" />
											))}
										</div>
									)}
									<div className="flex items-center gap-4">
										<button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary rounded-lg">
											<ThumbsUp className="w-4 h-4" />
											<span>{review.likes}</span>
										</button>
										<button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary rounded-lg">
											<ThumbsDown className="w-4 h-4" />
											<span>{review.dislikes}</span>
										</button>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Review Form */}
				<Card className="p-6 rounded-xl">
					<h3 className="text-2xl font-bold mb-6">Submit Your Review</h3>
					<form className="space-y-4" onSubmit={handleSubmit} suppressHydrationWarning>
						<div>
							<label className="block text-sm font-medium mb-2">Add Your Rating</label>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<button key={star} type="button" onMouseEnter={() => setHoveredRating(star)} onMouseLeave={() => setHoveredRating(0)} onClick={() => setRating(star)} className="focus:outline-none rounded-lg">
										<Star className={`w-8 h-8 ${star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
									</button>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-2">
									Name
								</label>
								<Input id="name" placeholder="John Doe" suppressHydrationWarning />
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2">
									Email
								</label>
								<Input id="email" type="email" placeholder="john@example.com" suppressHydrationWarning />
							</div>
						</div>
						<div>
							<label htmlFor="review" className="block text-sm font-medium mb-2">
								Write Your Review
							</label>
							<Textarea id="review" placeholder="Share your experience..." rows={4} suppressHydrationWarning />
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Upload Images (Optional)</label>
							<div className="grid grid-cols-5 gap-2 mb-2">
								{[...Array(5)].map((_, index) => (
									<div key={index} className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative overflow-hidden">
										{previewUrls[index] ? (
											<>
												<Image src={previewUrls[index] || "/placeholder.svg"} alt={`Preview ${index + 1}`} fill className="object-cover rounded-lg" />
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
						<Button type="submit" className="w-full bg-purple hover:bg-purple-dark rounded-lg">
							Leave Feedback
						</Button>
					</form>
				</Card>
			</div>
		</section>
	);
}
