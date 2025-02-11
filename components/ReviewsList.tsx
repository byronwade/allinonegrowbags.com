import { getReviews, getReviewStats } from "@/app/_actions/reviews";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export async function ReviewsList() {
	const { docs: reviews, totalDocs } = await getReviews({ limit: 10 });
	const stats = await getReviewStats();

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
				{/* Rating Distribution */}
				<div className="md:col-span-6 space-y-2">
					{Object.entries(stats.ratingDistribution)
						.reverse()
						.map(([rating, count]) => {
							const percentage = (count / stats.total) * 100;
							return (
								<div key={rating} className="flex items-center gap-2">
									<span className="w-8 text-sm text-muted-foreground">{rating} ★</span>
									<Progress value={percentage} className="h-2" />
									<span className="w-12 text-sm text-muted-foreground">{percentage.toFixed(0)}%</span>
								</div>
							);
						})}
				</div>

				{/* Summary Stats */}
				<div className="md:col-span-6 grid grid-cols-2 gap-4">
					<Card className="p-4 rounded-xl">
						<CardContent className="p-0">
							<h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
							<p className="text-3xl font-bold">{totalDocs}+</p>
						</CardContent>
					</Card>
					<Card className="p-4 rounded-xl">
						<CardContent className="p-0">
							<h3 className="text-lg font-semibold mb-2">Average Rating</h3>
							<div className="flex items-center gap-2">
								<p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
								<div className="flex">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star key={star} className={`w-4 h-4 ${star <= Math.round(stats.averageRating) ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
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
								<AvatarImage src={review.customerImage as string} alt={review.customerName} />
								<AvatarFallback>
									{review.customerName
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-semibold">{review.customerName}</h3>
									<span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
								</div>
								<div className="flex mb-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star key={star} className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
									))}
								</div>
								<p className="text-sm text-muted-foreground mb-4">{review.reviewText}</p>
								{review.customerLocation && (
									<p className="text-sm text-muted-foreground mb-2">
										<span className="font-semibold">Location:</span> {review.customerLocation}
									</p>
								)}
								{review.verifiedPurchase && <p className="text-sm text-green-500 mb-2">✓ Verified Purchase</p>}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
