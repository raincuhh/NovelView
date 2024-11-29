import React from "react";
import { CenteredLayout } from "@/shared/components/layout";
import { isTauri } from "@tauri-apps/api/core";
import { useMediaQuery } from "@/shared/hooks";
import { ViewSwitcherProvider } from "@/shared/providers";
import LandingViewsContainer from "./landingViewsContainer";
import { LandingPageViews, LandingPageType } from "../../lib/types";

const LandingPage = (): React.JSX.Element => {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <CenteredLayout
            maxWidth="sm:max-w-sm md:max-w-md"
            justifyChildren={!isTauri() && !isSm ? "justify-start" : "justify-center"}
         >
            <ViewSwitcherProvider<LandingPageType>
               initialView={LandingPageViews.home}
               duration={300}
               type={LandingPageViews}
            >
               <LandingViewsContainer />
            </ViewSwitcherProvider>
         </CenteredLayout>
      </>
   );
};

export default LandingPage;
