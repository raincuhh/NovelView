import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { useEnvironment } from "@/shared/hooks";
import { CoreNavbar } from "@/widgets/coreNavbar";


type PageLayoutProps = PropsWithChildren & { id: string };

const PageLayout = ({ children, id }: PageLayoutProps): React.JSX.Element => {
   const { isMobile, showTitlebar } = useEnvironment();
   const location = useLocation();

   return (
      <>
         <div
            className="flex flex-col min-h-full font-family-primary text-normal font-weight-md dark:bg-primary
               dark:text-normal dark:sm:bg-primary-alt"
         >
            <div className="min-h-full h-dvh">
               {isMobile && location.pathname != "/" && (
                  <>
                     <CoreNavbar />
                  </>
               )}
               <main id={id} className={`h-full ${showTitlebar ? "pt-8" : ""}`}>
                  {children}
               </main>
            </div>
         </div>
      </>
   );
};

export default PageLayout;
