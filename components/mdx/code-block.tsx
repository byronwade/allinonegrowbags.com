"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	children: string;
	className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(children);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div className="relative group">
			<pre className={cn("mb-4 overflow-x-auto rounded-lg bg-secondary/50 p-4 font-mono text-sm", className)}>
				{children}
				<button onClick={copyToClipboard} className="absolute top-2 right-2 p-2 rounded bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Copy code">
					{isCopied ? <span className="text-green-400">Copied!</span> : <span className="text-gray-400">Copy</span>}
				</button>
			</pre>
		</div>
	);
}
