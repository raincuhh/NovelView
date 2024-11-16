import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../lib/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import { RouteTypes } from "../../../../shared/lib/types";

type ProtectedRouteProps = PropsWithChildren & {
   type?: RouteTypes;
};

export default function ProtectedRoute({
   children,
   type = RouteTypes.protected,
}: ProtectedRouteProps): JSX.Element {
   const { isAuthenticated, loading, role } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (type === RouteTypes.auth) {
         // if not authenticated and route is auth, stay.
         // if authenticated, redirect to dashboard.

         console.log("auth route");
         if (isAuthenticated) {
            console.log("is authenticated, not redirecting for dev rn though");
         }
      }

      if (type === RouteTypes.protected) {
         // if not authenticated and route is protected route,
         // redirect to auth route.
         console.log("protected route");
      }

      if (type === RouteTypes.admin) {
         // if authenticated and role != admin.
         // redirect with a 401 error no autherization
         console.log("admin route");
      }
   }, [isAuthenticated, navigate, loading, role, location.pathname]);

   return <>{children}</>;
}
