import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { supabase } from "@/shared/providers/systemProvider";
import { useMediaQuery } from "react-responsive";
import Titlebar from "@/widgets/desktop/titlebar/components/ui/titlebar";
import MobileNavigation from "@/widgets/mobile/mobileNav/components/ui/mobileNavigation";
import DesktopLibraries from "@/widgets/desktop/desktopLibraries/components/ui/desktopLibraries";
import { requireAuth } from "@/features/auth/lib/authGuard";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	beforeLoad: requireAuth,
});

function RouteComponent() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className="h-screen">
			<div className="flex h-full flex-col">{isMobile ? <MobileLayout /> : <DesktopLayout />}</div>
		</div>
	);
}

function DesktopLayout() {
	return (
		<div
			className="grid h-full w-full"
			style={{
				gridTemplateColumns: "min-content min-content 1fr",
				gridTemplateRows: "32px min-content 1fr",
				gridTemplateAreas: `
            "titlebar titlebar titlebar"
            "libraries page page"
            "libraries page page"
          `,
			}}
		>
			<Titlebar />
			<DesktopLibraries />
			{/* <div style={{ gridArea: "notice" }}>notice (notice)</div> */}
			<div style={{ gridArea: "page" }}>
				<div className="bg-primary-alt border-border border-t border-l rounded-tl-md h-full overflow-hidden">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

function MobileLayout() {
	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex relative flex-col h-full w-full overflow-hidden">
				<div className="flex-1 overflow-auto">
					<Outlet />
				</div>
				<MobileNavigation />
			</div>
		</div>
	);
}
