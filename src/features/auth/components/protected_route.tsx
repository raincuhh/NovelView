import { PropsWithChildren, useEffect } from "react";
import { use_auth } from "../lib/hooks";
import { useLocation, useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({
   children,
}: ProtectedRouteProps): JSX.Element {
   const { is_authenticated, loading } = use_auth();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (!is_authenticated) {
         // redirect
      }
   }, [is_authenticated, navigate, loading, location.pathname]);

   return <>{children}</>;
}
