import { useAuthStore } from "@/features/auth/authStore";
import { useUserFirstLibraryQuery } from "@/features/books/model/queries/useBookQuery";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import TestList from "@/features/test/components/ui/testList";
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
		<>
			<FadeIn>
				<LibrariesNavbar />
			</FadeIn>
			<ScrollContainer className="h-full pt-2">
				<div className="h-full gap-8 flex flex-col">
					{hasLibraries ? (
						<>
							<FadeIn className="flex flex-col h-full flex-1 flex-grow">
								<LibrariesList />
							</FadeIn>
							<FadeIn>
								<TestList count={1000} />
							</FadeIn>
							<MobileBottomPadding />
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
			</ScrollContainer>
		</>
	);
}
