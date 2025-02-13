"use client";

import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-components";

export default function MDXPage({ children }: { children: React.ReactNode }) {
	return (
		<MDXProvider components={useMDXComponents({})}>
			<div className="prose prose-invert prose-purple max-w-4xl mx-auto">{children}</div>
		</MDXProvider>
	);
}
