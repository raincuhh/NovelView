import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   Navigate,
} from "react-router-dom";
import ProtectedRoute, {
   ProtectedRouteTypes,
} from "../../features/auth/components/utils/protected_route";

//pages
import NotFoundPage from "../../pages/error/not_found/page";
import ErrorBoundary from "../../pages/error/error_boundary/page";
import LoginPage from "../../pages/login/page";
import RegisterPage from "../../pages/register/page";
import PageLayout from "../../shared/components/layouts/page_layout";

type RouteListProps = {
   path: string;
   element: JSX.Element;
   error_element?: JSX.Element;
   protected_route?: boolean;
   protected_route_type?: ProtectedRouteTypes;
};

const route_list: RouteListProps[] = [
   {
      path: "*",
      element: <NotFoundPage />,
      error_element: <ErrorBoundary />,
   },
   {
      path: "/",
      element: <Navigate to="/login" />,
      error_element: <ErrorBoundary />,
   },
   {
      path: "/login",
      element: <LoginPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      protected_route_type: ProtectedRouteTypes.auth,
   },
   {
      path: "/register",
      element: <RegisterPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      protected_route_type: ProtectedRouteTypes.auth,
   },
   {
      path: "/dashboard",
      element: <LoginPage />,
      error_element: <ErrorBoundary />,
      protected_route: true,
      protected_route_type: ProtectedRouteTypes.default,
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
                        type={route.protected_route_type}
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
