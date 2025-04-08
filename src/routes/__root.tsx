import { PropsWithChildren } from "react";
import { Outlet, createRootRoute, Scripts } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppProvider from "@/shared/providers/appProvider";
import "../../src/global.css";
import ModalRoot from "@/features/modal/components/ui/modalRoot";

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
		<AppProvider>
			<RootLayout>{children}</RootLayout>
			<div className="absolute hidden">
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<TanStackRouterDevtools position="bottom-right" />
			</div>
			<Scripts />
		</AppProvider>
	);
}

type RootLayoutProps = PropsWithChildren;

function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<div className="flex flex-col bg-primary text-normal font-medium">
				<main>{children}</main>
			</div>
			<ModalRoot />
		</>
	);
}
