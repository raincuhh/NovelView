import { PropsWithChildren, useEffect } from "react";
import { RouteTypes } from "../../../../shared/types/routing";

type RouteGuardProps = PropsWithChildren & { type?: RouteTypes };

export default function RouteGuard({
   children,
   type = RouteTypes.protected,
}: RouteGuardProps): React.JSX.Element {
   useEffect(() => {
      console.log(type);
   }, []);

   return <>{children}</>;
}
