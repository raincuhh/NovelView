import {
   HashRouter as Router,
   Route,
   createHashRouter,
   createRoutesFromElements,
   RouteObject,
} from "react-router-dom";

import AppLayoutRegistry from "@/shared/components/utils/appLayoutRegistry";
import { PageLayout, AppLayout } from "@/shared/components/layout";

import SuspenseWithDelay from "@/shared/components/utils/suspenseWithDelay";
import RouteList from "./routeList";
import { RouteListProps } from "@/shared/types";
import { ErrorBoundary } from "@/shared/components/utils";
import { SplashScreen } from "@/shared/components/overlay";
import RouteGuard from "@/features/auth/components/utils/routeGuard";

const appRouter = createHashRouter(
   createRoutesFromElements(
      <>
         {RouteList.map((route: RouteListProps, i: number) => {
            const PageLayout =
               AppLayoutRegistry[route.layout as keyof typeof AppLayoutRegistry] ||
               AppLayoutRegistry.base;
            const layoutProps = route.layoutProps || {};

            return (
               <Route
                  key={i}
                  path={route.path}
                  element={
                     <RouteGuard type={route.routeType}>
                        <SuspenseWithDelay fallback={<SplashScreen />} delay={300}>
                           <AppLayout>
                              <PageLayout {...layoutProps}>{route.element}</PageLayout>
                           </AppLayout>
                        </SuspenseWithDelay>
                     </RouteGuard>
                  }
                  errorElement={
                     route.errorElement || (
                        <ErrorBoundary
                           fallback={
                              "An error has occurred, check DevTools for more details."
                           }
                        />
                     )
                  }
               />
            );
         })}
      </>,
   ),
);

export default appRouter;
