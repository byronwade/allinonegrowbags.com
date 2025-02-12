import escapeHTML from "escape-html";
import React, { Fragment } from "react";

type SerializedLexicalNode = {
	type: string;
	version: number;
	children?: SerializedLexicalNode[];
	format?: string;
	style?: string;
	text?: string;
	tag?: number;
	listType?: string;
	url?: string;
	target?: string;
};

type LexicalContent = {
	root: SerializedLexicalNode;
};

const HeadingComponents = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6",
} as const;

export function lexicalRichTextToReact(content: LexicalContent): React.ReactNode {
	if (!content?.root?.children) {
		return null;
	}

	return content.root.children.map((node, i) => renderNode(node, i));
}

function renderNode(node: SerializedLexicalNode, index: number): React.ReactNode {
	const { type, children, text, format } = node;

	if (text) {
		const renderedText = escapeHTML(text);
		return <Fragment key={index}>{renderedText}</Fragment>;
	}

	if (type === "paragraph") {
		return (
			<p key={index} className={format === "center" ? "text-center" : ""}>
				{children?.map((child, i) => renderNode(child, i))}
			</p>
		);
	}

	if (type === "heading" && node.tag && node.tag in HeadingComponents) {
		const Component = HeadingComponents[node.tag as keyof typeof HeadingComponents];
		return (
			<Component key={index} className={format === "center" ? "text-center" : ""}>
				{children?.map((child, i) => renderNode(child, i))}
			</Component>
		);
	}

	if (type === "list") {
		const Component = node.listType === "number" ? "ol" : "ul";
		return <Component key={index}>{children?.map((child, i) => renderNode(child, i))}</Component>;
	}

	if (type === "listitem") {
		return <li key={index}>{children?.map((child, i) => renderNode(child, i))}</li>;
	}

	if (type === "quote") {
		return <blockquote key={index}>{children?.map((child, i) => renderNode(child, i))}</blockquote>;
	}

	if (type === "link" && node.url) {
		return (
			<a key={index} href={node.url} target={node.target || "_self"} rel="noopener noreferrer">
				{children?.map((child, i) => renderNode(child, i))}
			</a>
		);
	}

	return children?.map((child, i) => renderNode(child, i)) || null;
}
