import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { RouteTypes, RouteListProps } from "@/shared/types";
import("@/pages/landing");

const NotFoundPage = lazy(() => import("@/pages/notFound/components/ui/notFoundPage"));
const LandingPage = lazy(() => import("@/pages/landing/components/ui/landingPage"));
const HomePage = lazy(() => import("@/pages/home/components/ui/homePage"));
const LibrariesPage = lazy(() => import("@/pages/libraries/components/ui/librariesPage"));
const LibraryDetailPage = lazy(
   () => import("@/pages/libraryDetail/components/ui/libraryDetailPage"),
);
const ReaderPage = lazy(() => import("@/pages/reader/components/ui/readerPage"));

const RouteList: RouteListProps[] = [
   {
      id: "not-found",
      path: "/404",
      element: <NotFoundPage />,
      routeType: RouteTypes.public,
   },
   {
      id: "all",
      path: "*",
      element: <Navigate to={"/404"} replace={true} />,
   },
   {
      id: "landing",
      path: "/",
      element: <LandingPage />,
      routeType: RouteTypes.public,
   },
   {
      id: "home",
      path: "/home",
      element: <HomePage />,
      routeType: RouteTypes.public,
      layout: "singleSidebar",
      layoutProps: {
         side: (
            <>
               <div>awdawdaw</div>
            </>
         ),
      },
   },
   {
      id: "libraries",
      path: "/libraries",
      element: <LibrariesPage />,
      routeType: RouteTypes.public,
   },
   {
      id: "library-detail",
      path: "/libraries/:libraryId",
      element: <LibraryDetailPage />,
      routeType: RouteTypes.public,
   },
   {
      id: "reader",
      path: "/book/:bookId/",
      element: <ReaderPage />,
      routeType: RouteTypes.public,
   },
   {
      id: "recents",
      path: "/recents",
      element: <div></div>,
      routeType: RouteTypes.public,
   },
];

export default RouteList;
