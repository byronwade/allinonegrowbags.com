import Image from "next/image";

interface ImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	caption?: string;
}

export function ResponsiveImage({ src, alt, width, height, caption }: ImageProps) {
	return (
		<figure className="my-8">
			<div className="overflow-hidden rounded-lg">
				<Image src={src} alt={alt} width={width || 1200} height={height || 630} className="w-full transition-transform hover:scale-105 rounded-lg" />
			</div>
			{caption && <figcaption className="mt-2 text-center text-sm text-gray-400">{caption}</figcaption>}
		</figure>
	);
}
