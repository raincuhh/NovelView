import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   Navigate,
   replace,
} from "react-router-dom";

import ProtectedRoute from "../../features/auth/components/utils/protected_route";
import { RouteTypes } from "../../shared/lib/types";
import PageLayout from "../../shared/components/layouts/page_layout";

//pages
import NotFoundPage from "../../pages/not_found/page";
import ErrorBoundary from "../../pages/error_boundary/page";

import LandingPage from "../../pages/landing/page";
import LoginPage from "../../pages/login/page";
import RegisterPage from "../../pages/register/page";
import AdminPage from "../../pages/admin/page";
import AdminUsersPage from "../../pages/admin/users/page";

type RouteListProps = {
   path: string;
   element: JSX.Element;
   error_element?: JSX.Element;
   protected_route?: boolean;
   route_type?: RouteTypes;
};

const route_list: RouteListProps[] = [
   //public
   {
      path: "/not-found",
      element: <NotFoundPage />,
      error_element: <ErrorBoundary />,
   },
   {
      path: "*",
      element: <Navigate to={"/not-found"} />,
      error_element: <ErrorBoundary />,
   },
   {
      path: "/",
      element: <LandingPage />,
      error_element: <ErrorBoundary />,
   },
   //auth
   {
      path: "/login",
      element: <LoginPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      route_type: RouteTypes.auth,
   },

   {
      path: "/register",
      element: <RegisterPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      route_type: RouteTypes.auth,
   },
   //protected
   {
      path: "/dashboard",
      element: <LoginPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      route_type: RouteTypes.protected,
   },
   //admin
   {
      path: "/admin",
      element: <AdminPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      route_type: RouteTypes.admin,
   },
   {
      path: "/admin/users",
      element: <AdminUsersPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      route_type: RouteTypes.admin,
   },
];

const routes = createRoutesFromElements(
   <>
      {route_list.map(
         (route: RouteListProps, i: number) => (
            <Route
               key={i}
               path={route.path}
               element={
                  route.protected_route ? (
                     <ProtectedRoute
                        type={route.route_type}
                     >
                        <PageLayout>
                           {route.element}
                        </PageLayout>
                     </ProtectedRoute>
                  ) : (
                     <PageLayout>
                        {route.element}
                     </PageLayout>
                  )
               }
               errorElement={
                  <PageLayout>
                     {route.error_element}
                  </PageLayout>
               }
            />
         )
      )}
   </>
);

export const router = createHashRouter(routes);
