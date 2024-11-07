import { PropsWithChildren, useEffect } from "react";
import { use_auth } from "../lib/hooks";
import { useLocation, useNavigate } from "react-router-dom";

export enum ProtectedRouteTypes {
   auth,
   admin,
   default,
}

type ProtectedRouteProps = PropsWithChildren & {
   type?: ProtectedRouteTypes;
};

export default function ProtectedRoute({
   children,
   type = ProtectedRouteTypes.default,
}: ProtectedRouteProps): JSX.Element {
   const { is_authenticated, loading, role } = use_auth();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (type === ProtectedRouteTypes.auth) {
         // logic: if not authenticated and route is auth, stay.
         // if authenticated, redirect to dashboard.

         console.log("auth route");
         if (is_authenticated) {
            console.log(
               "is authenticated, not redirecting for dev rn though"
            );
         }
      }

      if (type === ProtectedRouteTypes.default) {
         // logic: if not authenticated and route is protected route,
         // redirect to auth route.
         console.log("protected route");
      }

      if (type === ProtectedRouteTypes.admin) {
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
