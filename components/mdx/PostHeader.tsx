import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";

interface PostHeaderProps {
	title: string;
	description: string;
	date: string;
	readTime: string;
	author?: string;
	image?: string;
}

export function PostHeader({ title, description, date, readTime, author, image }: PostHeaderProps) {
	return (
		<header className="mb-12">
			{image && (
				<div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
					<Image src={image} alt={title} fill className="object-cover" priority />
				</div>
			)}
			<h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
			<p className="text-xl text-gray-300 mb-6">{description}</p>
			<div className="flex items-center gap-6 text-sm text-gray-400">
				<div className="flex items-center gap-2">
					<CalendarDays className="w-4 h-4" />
					<time dateTime={date}>
						{new Date(date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</div>
				<div className="flex items-center gap-2">
					<Clock className="w-4 h-4" />
					<span>{readTime}</span>
				</div>
				{author && (
					<div className="flex items-center gap-2">
						<span>By {author}</span>
					</div>
				)}
			</div>
		</header>
	);
}
