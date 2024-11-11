import { PropsWithChildren, useEffect } from "react";
import { use_auth } from "../../lib/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import { RouteTypes } from "../../../../shared/lib/types";

type ProtectedRouteProps = PropsWithChildren & {
   type?: RouteTypes;
};

export default function ProtectedRoute({
   children,
   type = RouteTypes.protected,
}: ProtectedRouteProps): JSX.Element {
   const { is_authenticated, loading, role } = use_auth();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (type === RouteTypes.auth) {
         // logic: if not authenticated and route is auth, stay.
         // if authenticated, redirect to dashboard.

         console.log("auth route");
         if (is_authenticated) {
            console.log(
               "is authenticated, not redirecting for dev rn though"
            );
         }
      }

      if (type === RouteTypes.protected) {
         // logic: if not authenticated and route is protected route,
         // redirect to auth route.
         console.log("protected route");
      }

      if (type === RouteTypes.admin) {
         // logic: if authenticated and role != admin.
         // redirect with a 401 error no autherization
         console.log("admin route");
      }
   }, [
      is_authenticated,
      navigate,
      loading,
      role,
      location.pathname,
   ]);

   return <>{children}</>;
}
