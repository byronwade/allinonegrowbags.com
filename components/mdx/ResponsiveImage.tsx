"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const FALLBACK_IMAGE = "/3_how-to-use-all-in-one-grow-bags.jpg";

interface ResponsiveImageProps {
	src: string;
	alt: string;
	aspectRatio?: string;
	priority?: boolean;
}

export function ResponsiveImage({ src, alt, aspectRatio = "16/9", priority = false }: ResponsiveImageProps) {
	const [imgSrc, setImgSrc] = useState(FALLBACK_IMAGE);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Test if the image exists
		const img = document.createElement("img");
		img.src = src;

		img.onload = () => {
			setImgSrc(src);
			setIsLoading(false);
			console.log("Image loaded successfully:", src);
		};

		img.onerror = () => {
			console.warn("Image failed to load, using fallback:", src);
			setImgSrc(FALLBACK_IMAGE);
			setIsLoading(false);
		};

		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [src]);

	return (
		<div className="relative w-full" style={{ aspectRatio }}>
			<Image src={imgSrc} alt={alt} fill className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`} onLoadingComplete={() => setIsLoading(false)} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={priority} />
		</div>
	);
}
