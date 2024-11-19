import React, { Suspense, lazy, useMemo } from "react";
import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   Navigate,
   replace,
} from "react-router-dom";
import SuspenseWithDelay from "../../shared/components/utils/suspenseWithDelay";

import { RouteTypes } from "../../shared/types/routing";
import RouteGuard from "../../features/auth/components/utils/routeGuard";
import PageLayout from "../../shared/components/layout/pageLayout";

//pages
import ErrorBoundary from "../../shared/components/utils/errorBoundary";
import SplashScreen from "../../shared/components/overlay/splashScreen";

import("../../pages/landing/page");

const NotFoundPage = lazy(() => import("../../pages/notFound/page"));
const LandingPage = lazy(() => import("../../pages/landing/page"));
const LoginPage = lazy(() => import("../../pages/login/page"));
const RegisterPage = lazy(() => import("../../pages/register/page"));
const DashboardPage = lazy(() => import("../../pages/dashboard/page"));
const AdminPage = lazy(() => import("../../pages/admin/page"));

type RouteListProps = {
   id: string;
   path: string;
   element: JSX.Element;
   errorElement?: JSX.Element;
   routeType?: RouteTypes;
};

const fallbackMessage: string = "An error has occured, check DevTools for more details.";

//TODO: do a loading screen or something, idk.
const SuspenseFallback = () => (
   <>
      <SplashScreen />
   </>
);

const RouteList: RouteListProps[] = [
   // public
   {
      id: "not-found",
      path: "/not-found",
      element: <NotFoundPage />,
   },
   {
      id: "not-found",
      path: "*",
      element: <Navigate to={"/not-found"} />,
   },
   {
      id: "landing",
      path: "/",
      element: <LandingPage />,
      routeType: RouteTypes.public,
   },
   // auth
   {
      id: "login",
      path: "/login",
      element: <LoginPage />,

      routeType: RouteTypes.auth,
   },
   {
      id: "register",
      path: "/register",
      element: <RegisterPage />,
      routeType: RouteTypes.auth,
   },
   // protected
   {
      id: "dashboard",
      path: "/dashboard",
      element: <DashboardPage />,
      routeType: RouteTypes.protected,
   },
   // admin
   {
      id: "admin",
      path: "/admin",
      element: <AdminPage />,
      routeType: RouteTypes.admin,
   },
];

const routes = createRoutesFromElements(
   <>
      {RouteList.map((route: RouteListProps, i: number) => (
         <Route
            key={i}
            path={route.path}
            element={
               <RouteGuard type={route.routeType}>
                  <PageLayout id={route.id}>
                     <SuspenseWithDelay fallback={<SuspenseFallback />} delay={600}>
                        {route.element}
                     </SuspenseWithDelay>
                  </PageLayout>
               </RouteGuard>
            }
            errorElement={
               route.errorElement || <ErrorBoundary fallback={fallbackMessage} />
            }
         />
      ))}
   </>,
);

export const appRouter = createHashRouter(routes);
