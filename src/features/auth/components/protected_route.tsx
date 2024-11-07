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
      if (!is_authenticated) {
         console.log(
            "is not authenticated, not redirecting for dev though"
         );
      }

      if (type === ProtectedRouteTypes.auth) {
         console.log("auth route");
      }

      if (type === ProtectedRouteTypes.default) {
         console.log("protected route");
      }

      if (type === ProtectedRouteTypes.admin) {
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
