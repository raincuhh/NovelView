import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   Navigate,
} from "react-router-dom";
import ProtectedRoute, {
   ProtectedRouteTypes,
} from "../../features/auth/components/protected_route";

//pages
import NotFoundPage from "../../pages/error/not_found/page";
import LoginPage from "../../pages/login/page";
import RegisterPage from "../../pages/register/page";

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
      error_element: <NotFoundPage />,
   },
   {
      path: "/",
      element: <Navigate to="/login" />,
      error_element: <NotFoundPage />,
   },
   {
      path: "/login",
      element: <LoginPage />,
      error_element: <NotFoundPage />,
      protected_route: true,
      protected_route_type: ProtectedRouteTypes.auth,
   },
   {
      path: "/register",
      element: <RegisterPage />,
      error_element: <NotFoundPage />,
      protected_route: true,
      protected_route_type: ProtectedRouteTypes.auth,
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
                        {route.element}
                     </ProtectedRoute>
                  ) : (
                     route.element
                  )
               }
               errorElement={route.error_element}
            />
         )
      )}
   </>
);

export const router = createHashRouter(routes);
