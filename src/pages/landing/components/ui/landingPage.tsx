import React from "react";
import { isTauri } from "@tauri-apps/api/core";

import { CenteredLayout } from "@/shared/components/layout";
import { useMediaQuery } from "@/shared/hooks";
import { ViewSwitcherProvider } from "@/shared/providers";
import LandingViewsContainer from "./landingViewsContainer";
import { LandingPageViews, LandingPageType } from "../../types";

const LandingPage = (): React.JSX.Element => {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <div className="w-full min-h-full justify-start flex flex-col">
            <div className="flex flex-col min-h-full px-4 sm:px-8">
               <div className="relative flex flex-col py-16 sm:mx-auto sm:w-full max-w-2xl">
                  <ViewSwitcherProvider<LandingPageType>
                     initialView={LandingPageViews.home}
                     duration={50}
                     type={LandingPageViews}
                  >
                     <LandingViewsContainer />
                  </ViewSwitcherProvider>
               </div>
            </div>
         </div>
      </>
   );
};

export default LandingPage;
