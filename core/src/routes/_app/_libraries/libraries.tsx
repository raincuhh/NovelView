import { useAuthStore } from "@/features/auth/authStore";
import { useUserFirstLibraryQuery } from "@/features/books/model/queries/useBookQuery";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import LibrariesHeader from "@/pages/libraries/components/ui/librariesHeader";
import LibrariesList from "@/pages/libraries/components/ui/librariesList";
import LibrariesNavbar from "@/pages/libraries/components/ui/librariesNavbar";
import FadeIn from "@/shared/components/ui/fadeIn";
import MobileBottomPadding from "@/shared/components/ui/mobileBottomPadding";
import ScrollContainer from "@/shared/components/ui/scrollContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_libraries/libraries")({
	component: RouteComponent,
});

function RouteComponent() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	const { data: libraries } = useUserFirstLibraryQuery(userId);
	const hasLibraries = !!libraries;

	return (
		<ScrollContainer className="h-full">
			<div className="relative flex flex-col h-full pt-12">
				<FadeIn>
					<LibrariesNavbar />
				</FadeIn>
				<div className="flex flex-col h-full mt-2 gap-8">
					{hasLibraries ? (
						<>
							<FadeIn>
								<LibrariesHeader />
							</FadeIn>
							<FadeIn>
								<LibrariesList />
							</FadeIn>
						</>
					) : (
						<>
							<FadeIn>
								<EmptyLibraries value="You have no libraries." />
							</FadeIn>
							<MobileBottomPadding />
						</>
					)}
				</div>
			</div>
		</ScrollContainer>
	);
}
