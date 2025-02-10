import Image from "next/image"

export default function MadeInUSA() {
	return (
		<section className="container mx-auto py-8 md:py-12 px-4" aria-labelledby="made-in-usa-heading">
			<div className="flex flex-col md:flex-row items-center justify-between">
				<div className="md:w-1/2 mb-6 md:mb-0">
					<h2 id="made-in-usa-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
						Proudly Made in the USA
					</h2>
					<p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-gray-300">Every ZugzBag all-in-one mushroom grow bag is crafted with care in Santa Cruz, California. We&apos;re committed to supporting local economies and ensuring the highest quality standards for our products.</p>
					<ul className="list-disc list-inside text-sm md:text-base text-gray-300 space-y-1 md:space-y-2">
						<li>Locally sourced materials</li>
						<li>Stringent quality control</li>
						<li>Supporting American jobs</li>
						<li>Reduced carbon footprint</li>
					</ul>
				</div>
				<div className="md:w-1/2 flex justify-center">
					<div className="relative">
						<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20082335-hpq2N9IsTJy5F8eU5O22WgDRd11VoS.png" alt="Made in Santa Cruz, California" width={600} height={450} className="rounded-lg shadow-2xl" />
						<div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-3 md:p-4 rounded-lg shadow-xl">
							<Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%201-mwIEXqZgwGiJ5fWOn6LaVyeH8i3ds1.png" alt="American Flag" width={100} height={60} className="rounded" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

