import { cache } from "react";
import { payload } from "@/payload";
import { Review } from "@/payload-types";
import { revalidatePath, revalidateTag } from "next/cache";

const REVIEWS_TAG = "reviews";

export const getReviews = cache(
	async (options?: { page?: number; limit?: number; featured?: boolean; status?: "pending" | "approved" | "rejected" }) => {
		const { page = 1, limit = 10, featured, status = "approved" } = options || {};

		try {
			const reviews = await payload.find({
				collection: "reviews",
				where: {
					status: {
						equals: status,
					},
					...(featured
						? {
								featured: {
									equals: true,
								},
							}
						: {}),
				},
				page,
				limit,
				sort: "-createdAt",
			});

			return reviews;
		} catch (error) {
			console.error("Error fetching reviews:", error);
			throw error;
		}
	},
	[REVIEWS_TAG]
);

export const getFeaturedReviews = cache(
	async (limit: number = 3) => {
		try {
			const reviews = await payload.find({
				collection: "reviews",
				where: {
					status: {
						equals: "approved",
					},
					featured: {
						equals: true,
					},
				},
				limit,
				sort: "-createdAt",
			});

			return reviews.docs as Review[];
		} catch (error) {
			console.error("Error fetching featured reviews:", error);
			throw error;
		}
	},
	[REVIEWS_TAG]
);

export const getAverageRating = cache(async () => {
	try {
		const reviews = await payload.find({
			collection: "reviews",
			where: {
				status: {
					equals: "approved",
				},
			},
			limit: 1000,
		});

		if (!reviews.docs.length) return 0;

		const total = reviews.docs.reduce((acc: number, review) => acc + (review.rating as number), 0);
		return total / reviews.docs.length;
	} catch (error) {
		console.error("Error calculating average rating:", error);
		throw error;
	}
}, [REVIEWS_TAG]);

export async function submitReview(data: { customerName: string; rating: number; reviewText: string; purchasedProduct: string; customerLocation?: string; customerImage?: string }) {
	try {
		await payload.create({
			collection: "reviews",
			data: {
				...data,
				status: "pending",
				verifiedPurchase: false,
			},
		});

		// Revalidate both the path and the tag
		revalidatePath("/reviews");
		revalidateTag(REVIEWS_TAG);

		return { success: true };
	} catch (error) {
		console.error("Error submitting review:", error);
		return { success: false, error: "Failed to submit review" };
	}
}

export const getReviewStats = cache(async () => {
	try {
		const reviews = await payload.find({
			collection: "reviews",
			where: {
				status: {
					equals: "approved",
				},
			},
			limit: 1000,
		});

		const stats = {
			total: reviews.totalDocs,
			averageRating: 0,
			ratingDistribution: {
				5: 0,
				4: 0,
				3: 0,
				2: 0,
				1: 0,
			},
			verifiedPurchases: 0,
		};

		reviews.docs.forEach((review: Review) => {
			const rating = review.rating as number;
			stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]++;
			if (review.verifiedPurchase) stats.verifiedPurchases++;
		});

		if (reviews.totalDocs > 0) {
			const total = Object.entries(stats.ratingDistribution).reduce((acc: number, [rating, count]) => acc + Number(rating) * count, 0);
			stats.averageRating = total / reviews.totalDocs;
		}

		return stats;
	} catch (error) {
		console.error("Error fetching review stats:", error);
		throw error;
	}
}, [REVIEWS_TAG]);
