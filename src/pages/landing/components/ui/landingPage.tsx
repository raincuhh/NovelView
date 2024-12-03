import React, { useEffect } from "react";

import ViewNavProvider from "../../provider/viewNavProvider";
import { ViewSwitcherProvider } from "@/shared/providers";
import LandingViewsContainer from "./landingViewsContainer";
import { LandingPageViews, LandingPageType } from "../../types";
import { useEnvironment } from "@/shared/hooks";

const LandingPage = (): React.JSX.Element => {
   const { setTitlebarButtons } = useEnvironment();

   useEffect(() => {
      setTitlebarButtons(["close", "minimize"]);
   }, []);

   return (
      <>
         <div className="w-full min-h-full justify-start flex flex-col h-full">
            <div className="flex flex-col min-h-full px-4 sm:px-8">
               <ViewSwitcherProvider<LandingPageType>
                  initialView={LandingPageViews.home}
                  duration={50}
                  type={LandingPageViews}
               >
                  <ViewNavProvider>
                     <div className="relative flex flex-col sm:py-8 pb-16 sm:mx-auto sm:w-full max-w-2xl h-full">
                        <LandingViewsContainer />
                     </div>
                  </ViewNavProvider>
               </ViewSwitcherProvider>
            </div>
         </div>
      </>
   );
};

export default LandingPage;
