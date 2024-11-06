import { PropsWithChildren, useEffect } from "react";
import { use_auth } from "../lib/hooks";
import { useLocation, useNavigate } from "react-router-dom";

enum ProtectedRouteTypes {
   auth,
   admin,
   protected,
}

type ProtectedRouteProps = PropsWithChildren & { type?: ProtectedRouteTypes };

export default function ProtectedRoute({
   children,
}: ProtectedRouteProps): JSX.Element {
   const { is_authenticated, loading, role } = use_auth();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (!is_authenticated) {
         console.log("is not authenticated, not redirecting for dev though");
      }
   }, [is_authenticated, navigate, loading, location.pathname]);

   return <>{children}</>;
}
