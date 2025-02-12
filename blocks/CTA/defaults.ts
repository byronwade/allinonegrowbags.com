export interface CTAContent {
	heading: string;
	description: string;
	benefits: Array<{ text: string }>;
	rating: {
		score: string;
		text: string;
	};
	limitedTimeOffer: string;
}

export const defaultCTAContent: CTAContent = {
	heading: "Ready to Start Growing?",
	description: "Join thousands of successful growers using our premium all-in-one grow bags.",
	benefits: [{ text: "Unmatched Quality: Our sterilized substrate and premium spawn ensure the best results." }, { text: "Beginner-Friendly: No experience needed – just follow the instructions!" }, { text: "Fast and Reliable: Harvest your mushrooms in just 2-3 weeks." }, { text: "Grow Anywhere: Perfect for homes, apartments, or small spaces." }],
	rating: {
		score: "4.9/5",
		text: "from over 1,000+ happy growers",
	},
	limitedTimeOffer: "Limited Time Offer",
};
