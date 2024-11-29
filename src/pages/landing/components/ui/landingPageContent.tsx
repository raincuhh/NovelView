import React from "react";
// import CenteredLayout from "../../../../shared/components/layout/centeredLayout";
// import { ViewSwitcherProvider } from "../../../../shared/providers/viewSwitcherProvider";
// import LandingViewsContainer from "./landingViewsContainer";
// import { isTauri } from "@tauri-apps/api/core";
// import useMediaQuery from "../../../../shared/hooks/useMediaQuery";

export default function LandingPageContent(): JSX.Element {
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
}
