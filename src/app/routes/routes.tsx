import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   Navigate,
   replace,
} from "react-router-dom";

import { RouteTypes } from "../../shared/types/routing";
import RouteGuard from "../../features/auth/components/utils/routeGuard";
import PageLayout from "../../shared/components/layout/pageLayout";

//pages
import ErrorBoundary from "../../shared/components/utils/errorBoundary";
import NotFoundPage from "../../pages/notFound/page";

import LandingPage from "../../pages/landing/page";

import LoginPage from "../../pages/login/page";
import RegisterPage from "../../pages/register/page";

import DashboardPage from "../../pages/dashboard/page";
import AdminPage from "../../pages/admin/page";

type RouteListProps = {
   path: string;
   element: JSX.Element;
   errorElement: JSX.Element;
   routeType?: RouteTypes;
};

const fallbackMessage: string = "An error has occured, check DevTools for more details.";

const RouteList: RouteListProps[] = [
   // public
   {
      path: "/not-found",
      element: <NotFoundPage />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,
   },
   {
      path: "*",
      element: <Navigate to={"/not-found"} />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,
   },
   {
      path: "/",
      element: <LandingPage />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,
      routeType: RouteTypes.public,
   },
   // auth
   {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,

      routeType: RouteTypes.auth,
   },
   {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,
      routeType: RouteTypes.auth,
   },
   // protected
   {
      path: "/dashboard",
      element: <DashboardPage />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,
      routeType: RouteTypes.protected,
   },
   // admin
   {
      path: "/admin",
      element: <AdminPage />,
      errorElement: <ErrorBoundary fallback={fallbackMessage} />,
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
                  <PageLayout>{route.element}</PageLayout>
               </RouteGuard>
            }
            errorElement={route.errorElement}
         />
      ))}
   </>
);

export const appRouter = createHashRouter(routes);
