import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/mdx/code-block";
import { Callout } from "@/components/mdx/callout";
import { ResponsiveImage } from "@/components/mdx/responsive-image";
import { Steps } from "@/components/mdx/steps";
import { GuideStep } from "@/components/mdx/guide-step";
import { PostHeader } from "@/components/mdx/post-header";
import { ClientLink } from "@/components/mdx/client-link";
import type { Route } from "next";
import { GuideContent, Table, TableHead, TableBody, TableRow, TableCell, TableHeader, FAQSection, FAQQuestion, FAQAnswer } from "@/components/mdx";
import { AutoFAQSchema } from "@/components/mdx/AutoFAQSchema";
import { FAQ } from "@/components/mdx/FAQ";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Typography
		h1: ({ children }) => <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-white">{children}</h1>,
		h2: ({ children }) => <h2 className="mt-10 scroll-m-20 border-b border-b-gray-700 pb-2 text-3xl font-semibold tracking-tight text-white first:mt-0">{children}</h2>,
		h3: ({ children }) => <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-white">{children}</h3>,
		h4: ({ children }) => <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-white">{children}</h4>,
		p: ({ children }) => <p className="leading-7 text-gray-300 [&:not(:first-child)]:mt-6">{children}</p>,

		// Lists
		ul: ({ children }) => <ul className="my-6 ml-6 list-disc text-gray-300 [&>li]:mt-2">{children}</ul>,
		ol: ({ children }) => <ol className="my-6 ml-6 list-decimal text-gray-300 [&>li]:mt-2">{children}</ol>,
		li: ({ children }) => <li className="mt-2">{children}</li>,

		// Inline elements
		a: ({ href = "/", children }) => (
			<ClientLink href={href as Route} className="font-medium text-purple hover:text-purple-300 underline underline-offset-4">
				{children}
			</ClientLink>
		),
		strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
		em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
		code: ({ children }) => {
			if (typeof children === "string") {
				return <code className="relative rounded bg-secondary/50 px-[0.3rem] py-[0.2rem] font-mono text-sm text-gray-300">{children}</code>;
			}
			return null;
		},

		// Block elements
		pre: ({ children, ...props }) => {
			if (typeof children === "string") {
				return <CodeBlock {...props}>{children}</CodeBlock>;
			}
			return <pre {...props}>{children}</pre>;
		},
		img: ({ src, alt, width, height, ...props }) => {
			if (src) {
				const numWidth = width ? Number(width) : undefined;
				const numHeight = height ? Number(height) : undefined;
				return <ResponsiveImage src={src} alt={alt || ""} width={numWidth} height={numHeight} {...props} />;
			}
			return null;
		},

		// Custom components
		ResponsiveImage,
		Steps,
		Callout,
		GuideStep,
		PostHeader,
		Link: ClientLink,
		Button,
		GuideContent,
		Table,
		TableHead,
		TableBody,
		TableRow,
		TableCell,
		TableHeader,
		FAQSection,
		FAQQuestion,
		FAQAnswer,
		AutoFAQSchema,
		FAQ,

		// Extend with passed components
		...components,
	};
}
