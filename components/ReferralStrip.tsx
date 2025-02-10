import Link from "next/link";

export default function ReferralStrip() {
	return (
		<section className="bg-purple py-3">
			<div className="container mx-auto px-4">
				<p className="text-center text-white text-sm md:text-base">
					Earn 30% commission on referrals!{" "}
					<Link href="/contact" className="underline font-semibold">
						Contact us
					</Link>{" "}
					to learn more.
				</p>
			</div>
		</section>
	);
}
