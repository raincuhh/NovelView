import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   RouteObject,
} from "react-router-dom";

import SuspenseWithDelay from "@/shared/components/utils/suspenseWithDelay";
import RouteList from "./routeList";
import { PageLayout } from "@/shared/components/layout";
import { ErrorBoundary } from "@/shared/components/utils";
import { SplashScreen } from "@/shared/components/overlay";
import RouteGuard from "@/features/auth/components/utils/routeGuard";
import { RouteListProps } from "@/shared/types";

const routes: RouteObject[] = createRoutesFromElements(
   <>
      {RouteList.map((route: RouteListProps, i: number) => (
         <Route
            key={i}
            path={route.path}
            element={
               <RouteGuard type={route.routeType}>
                  <PageLayout id={route.id}>
                     <SuspenseWithDelay fallback={<SplashScreen />} delay={600}>
                        {route.element}
                     </SuspenseWithDelay>
                  </PageLayout>
               </RouteGuard>
            }
            errorElement={
               route.errorElement || (
                  <ErrorBoundary
                     fallback={"An error has occurred, check DevTools for more details."}
                  />
               )
            }
         />
      ))}
   </>,
);

export const appRouter = createHashRouter(routes);
