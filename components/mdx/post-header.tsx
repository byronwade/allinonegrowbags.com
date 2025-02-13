import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface PostHeaderProps {
	title: string;
	description: string;
	date: string;
	readTime: string;
	author?: string;
	image?: string;
}

const defaultImage = "/3_how-to-use-all-in-one-grow-bags.jpg"; // Updated fallback image path

export function PostHeader({ title, description, date, readTime, author, image }: PostHeaderProps) {
	return (
		<header className="mb-10">
			{/* Featured Image */}
			<div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
				<Image src={image || defaultImage} alt={title} fill className="object-cover rounded-lg m-0" priority />
			</div>

			{/* Post Meta */}
			<div className="space-y-4">
				<h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
				<p className="text-xl text-gray-300">{description}</p>
				<div className="flex items-center gap-4 text-sm text-gray-400">
					{author && (
						<>
							<span className="font-medium text-purple">{author}</span>
							<span>·</span>
						</>
					)}
					<time dateTime={date}>{formatDate(date)}</time>
					<span>·</span>
					<span>{readTime}</span>
				</div>
			</div>
		</header>
	);
}
