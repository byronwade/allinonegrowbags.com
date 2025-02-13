import { ContentWithSidebar } from "@/components/mdx/content-with-sidebar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background py-12">
			<ContentWithSidebar>{children}</ContentWithSidebar>
		</div>
	);
}
