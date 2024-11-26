import React from "react";
import CenteredLayout from "../../shared/components/layout/centeredLayout";
// import LandingBackgroundOverlay from "./landingBackgroundOverlay";
import LandingHeader from "./landingHeader";
import LandingActions from "./landingActions";
import { ViewSwitcherProvider } from "../../shared/providers/viewSwitcherProvider";
import LandingViewsContainer from "./landingViewsContainer";

enum LandingPageViews {
   home,
   login,
   register,
}

export default function LandingPageContent(): JSX.Element {
   return (
      <>
         <CenteredLayout maxWidth="sm:max-w-sm md:max-w-md">
            <ViewSwitcherProvider<LandingPageViews>
               initialView={LandingPageViews.home}
               duration={300}
            >
               <LandingViewsContainer />
            </ViewSwitcherProvider>
         </CenteredLayout>
      </>
   );
}
