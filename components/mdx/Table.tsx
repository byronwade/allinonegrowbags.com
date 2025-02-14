"use client";

import * as React from "react";

interface TableProps {
	children: React.ReactNode;
}

// Helper function to clean children of whitespace nodes
function cleanChildren(children: React.ReactNode): React.ReactNode[] {
	return React.Children.toArray(children)
		.filter((child) => {
			if (typeof child === "string") {
				return child.trim() !== "";
			}
			return React.isValidElement(child);
		})
		.map((child) => {
			if (typeof child === "string") {
				return child.trim();
			}
			return child;
		});
}

export function Table({ children }: TableProps) {
	const cleanedChildren = cleanChildren(children);
	return (
		<div className="my-6 w-full overflow-y-auto">
			<table className="w-full border-collapse border border-purple/20">{cleanedChildren}</table>
		</div>
	);
}

export function TableHead({ children }: TableProps) {
	const cleanedChildren = cleanChildren(children);
	return <thead className="bg-secondary/50">{cleanedChildren}</thead>;
}

export function TableBody({ children }: TableProps) {
	const cleanedChildren = cleanChildren(children);
	return <tbody>{cleanedChildren}</tbody>;
}

export function TableRow({ children }: TableProps) {
	const cleanedChildren = cleanChildren(children);
	return <tr className="border-b border-purple/20 last:border-0">{cleanedChildren}</tr>;
}

export function TableHeader({ children }: TableProps) {
	const cleanedChildren = cleanChildren(children);
	return <th className="border-r border-purple/20 p-4 text-left font-semibold text-white last:border-0">{cleanedChildren}</th>;
}

export function TableCell({ children }: TableProps) {
	const cleanedChildren = cleanChildren(children);
	return <td className="border-r border-purple/20 p-4 text-gray-300 last:border-0">{cleanedChildren}</td>;
}
