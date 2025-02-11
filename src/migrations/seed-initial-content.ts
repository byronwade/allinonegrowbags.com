import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	// Create Home Page without media for now
	await payload.create({
		collection: "pages",
		data: {
			title: "Home",
			isHomePage: true,
			status: "published",
			content: [
				{
					blockType: "features",
					heading: "Why Choose ZugzBag?",
					subheading: "Premium quality, consistent results, and exceptional customer service.",
					features: [
						{
							title: "Lab-Grade Sterility",
							description: "Our bags are sterilized in an autoclave under precise conditions to ensure complete sterility and optimal growing conditions.",
							icon: "microscope",
						},
						{
							title: "Perfect Ratio",
							description: "Each bag contains the ideal ratio of grain to substrate, scientifically formulated for maximum yields.",
							icon: "scale",
						},
						{
							title: "Filter Patch",
							description: "High-quality filter patches allow optimal gas exchange while maintaining sterility throughout the growing process.",
							icon: "filter",
						},
					],
				},
			],
		},
	});

	// Create Contact Page
	await payload.create({
		collection: "pages",
		data: {
			title: "Contact Us",
			slug: "contact",
			status: "published",
			content: [
				{
					blockType: "content",
					content: {
						root: {
							type: "root",
							children: [
								{
									type: "p",
									children: [
										{
											text: "Get in touch with our team of expert cultivators. We're here to help you succeed in your mushroom growing journey.",
										},
									],
									version: 1,
								},
							],
							direction: "ltr",
							format: "",
							indent: 0,
							version: 1,
						},
					},
				},
			],
		},
	});
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	// Delete all seeded content
	await payload.delete({
		collection: "pages",
		where: {
			slug: {
				in: ["/", "contact"],
			},
		},
	});
}
