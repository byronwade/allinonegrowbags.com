"use client";

import Link from "next/link";
import type { Route } from "next";

interface ClientLinkProps {
	href: Route | URL;
	children: React.ReactNode;
	className?: string;
}

export function ClientLink({ href, children, className }: ClientLinkProps) {
	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
}
