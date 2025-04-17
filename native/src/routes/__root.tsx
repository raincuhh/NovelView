import { PropsWithChildren } from "react";
import { Outlet, createRootRoute, Scripts } from "@tanstack/react-router";
// @ts-ignore
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// @ts-ignore
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppProvider from "@/shared/providers/appProvider";
import ModalRoot from "@/features/modal/components/ui/modalRoot";
import NotificationRoot from "@/features/notifications/components/ui/NotificationRoot";

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
			<div className="absolute">
				{/* <ReactQueryDevtools buttonPosition="top-right" /> */}
				{/* <TanStackRouterDevtools position="top-right" /> */}
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
			<NotificationRoot />
		</>
	);
}
