import { SidebarProduct } from "./sidebar-product";

interface ContentWithSidebarProps {
	children: React.ReactNode;
}

export function ContentWithSidebar({ children }: ContentWithSidebarProps) {
	return (
		<div className="container mx-auto px-4">
			{/* Content and Sidebar */}
			<div className="flex flex-col lg:flex-row gap-8">
				{/* Main Content Area */}
				<div className="flex-1">
					<article className="prose prose-invert prose-purple max-w-none">{children}</article>
				</div>

				{/* Sidebar */}
				<div className="w-full lg:w-80">
					<SidebarProduct />
				</div>
			</div>
		</div>
	);
}
