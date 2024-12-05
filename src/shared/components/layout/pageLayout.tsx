import React, { PropsWithChildren, lazy } from "react";
import { useLocation } from "react-router-dom";

import { useEnvironment } from "@/shared/hooks";
import SingleSidebarLayout from "./singleSidebarLayout";
import DoubleSidebarLayout from "./doubleSidebarLayout";
const CoreNavbar = lazy(() => import("@/widgets/coreNavbar/components/ui/coreNavbar"));

type PageLayoutProps = PropsWithChildren & { id: string };

const PageLayout = ({ children, id }: PageLayoutProps): React.JSX.Element => {
   const { isMobile, showTitlebar } = useEnvironment();
   const location = useLocation();

   const RenderTitlebarNav = (): React.JSX.Element => (
      <>
         <div className="w-full fixed h-8 bg-titlebar-background">titlebar shit</div>;
      </>
   );

   const RenderMainContent = (): React.JSX.Element => (
      <main id={id} className="h-full w-full">
         {children}
      </main>
   );

   if (location.pathname === "/") {
      return (
         <div
            className="flex flex-col min-h-full font-family-primary text-normal font-weight-md dark:bg-primary
               dark:text-normal dark:sm:bg-primary-alt"
         >
            <div className="min-h-full h-dvh">{<RenderMainContent />}</div>
         </div>
      );
   }

   return (
      <div
         className="flex flex-col min-h-full font-family-primary text-normal font-weight-md dark:bg-primary
            dark:text-normal dark:sm:bg-primary-alt"
      >
         <div className="min-h-full h-dvh w-full">
            {showTitlebar && <RenderTitlebarNav />}
            {isMobile && <CoreNavbar />}
            {!isMobile ? (
               <DoubleSidebarLayout
                  leftSide={<div>left sidebar</div>}
                  centerSide={<RenderMainContent />}
                  rightSide={<div>right sidebar</div>}
               />
            ) : (
               <RenderMainContent />
            )}
         </div>
      </div>
   );
};

export default PageLayout;
