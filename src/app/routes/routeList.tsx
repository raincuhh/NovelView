import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { RouteTypes, RouteListProps } from "@/shared/types";
import("@/pages/landing");

const NotFoundPage = lazy(() => import("@/pages/notFound/components/ui/notFoundPage"));
const LandingPage = lazy(() => import("@/pages/landing/components/ui/landingPage"));
const HomePage = lazy(() => import("@/pages/home/components/ui/homePage"));

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
   },
   {
      id: "libraries",
      path: "/libraries",
      element: <HomePage />,
   },
];

export default RouteList;
