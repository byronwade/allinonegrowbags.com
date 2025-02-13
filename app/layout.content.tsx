export default function ContentLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background">
			<main className="container mx-auto px-4 py-12">{children}</main>
		</div>
	);
}
