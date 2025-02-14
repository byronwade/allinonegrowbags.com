// Static data for MDX posts
export const mdxPosts = {
	guides: [
		{
			slug: "beginners-guide-to-growing-mushrooms",
			title: "Beginner's Guide to Growing Mushrooms",
			description: "A comprehensive guide for beginners starting their mushroom growing journey",
			date: "2024-01-01",
			readTime: "10 min",
			keywords: ["beginner", "mushroom growing", "cultivation", "grow bags", "sterilization", "inoculation", "colonization"],
		},
		{
			slug: "how-to-build-monotub-mushroom-cultivation",
			title: "How to Build a Monotub for Mushroom Cultivation",
			description: "Step-by-step guide to building and using a monotub",
			date: "2024-01-02",
			readTime: "8 min",
			keywords: ["monotub", "cultivation", "setup", "growing"],
		},
		{
			slug: "how-to-grow-mushrooms-at-home",
			title: "How to Grow Mushrooms at Home",
			description: "Complete guide to growing mushrooms in your home",
			date: "2024-01-03",
			readTime: "12 min",
			keywords: ["home growing", "mushrooms", "cultivation"],
		},
		{
			slug: "how-to-grow-mushrooms-indoors",
			title: "How to Grow Mushrooms Indoors",
			description: "Indoor mushroom cultivation techniques",
			date: "2024-01-04",
			readTime: "15 min",
			keywords: ["indoor growing", "cultivation", "environment control"],
		},
		{
			slug: "how-to-use-an-all-in-one-grow-bag",
			title: "How to Use an All-in-One Grow Bag",
			description: "Guide to using all-in-one mushroom grow bags",
			date: "2024-01-05",
			readTime: "8 min",
			keywords: ["grow bag", "mushroom cultivation", "inoculation", "colonization", "fruiting", "harvesting", "sterilization"],
		},
		{
			slug: "optimal-conditions",
			title: "Optimal Conditions for Mushroom Growing",
			description: "Understanding the perfect conditions for mushroom cultivation",
			date: "2024-01-06",
			readTime: "10 min",
			keywords: ["conditions", "temperature", "humidity", "lighting"],
		},
	],
	learn: [
		{
			slug: "getting-started",
			title: "Getting Started with Mushroom Cultivation",
			description: "Essential information for beginning your mushroom growing journey",
			date: "2024-01-01",
			readTime: "15 min",
			keywords: ["getting started", "beginner", "mushroom cultivation", "basics", "mycelium", "substrate", "colonization", "fruiting", "grow bags"],
		},
		{
			slug: "grow-bag-guide",
			title: "Complete Guide to Mushroom Grow Bags",
			description: "Everything you need to know about mushroom grow bags",
			date: "2024-01-02",
			readTime: "12 min",
			keywords: ["grow bags", "mushroom cultivation", "substrate", "sterilization", "filter patch", "specifications", "features"],
		},
	],
};

export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	author?: string;
	image?: string;
	keywords?: string[];
	content?: React.ReactNode;
	score?: number;
};
