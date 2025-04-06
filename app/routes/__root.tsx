import { PropsWithChildren } from "react";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import "../../src/global.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

type RootDocumentProps = PropsWithChildren;

function RootDocument({ children }: RootDocumentProps) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body className="scroll-smooth">
				<Layout>{children}</Layout>
				<div className="absolute">
					{/* <ReactQueryDevtools buttonPosition="bottom-left" />
					<TanStackRouterDevtools position="bottom-right" /> */}
				</div>
				<Scripts />
			</body>
		</html>
	);
}

type LayoutProps = PropsWithChildren;

function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col bg-primary text-normal font-medium">
			<main>{children}</main>
		</div>
	);
}
