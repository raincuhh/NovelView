import React from "react";
import CenteredLayout from "../../shared/components/layout/centeredLayout";
import { ViewSwitcherProvider } from "../../shared/providers/viewSwitcherProvider";
import LandingViewsContainer from "./landingViewsContainer";

export enum LandingPageViews {
   home = "home",
   login = "login",
   register = "register",
}

type LandingPageType = {
   [K in keyof typeof LandingPageViews]: (typeof LandingPageViews)[K];
};

export default function LandingPageContent(): JSX.Element {
   return (
      <>
         <CenteredLayout maxWidth="sm:max-w-sm md:max-w-md">
            <ViewSwitcherProvider<LandingPageType>
               initialView={LandingPageViews.home}
               duration={100}
               type={LandingPageViews}
            >
               <LandingViewsContainer />
            </ViewSwitcherProvider>
         </CenteredLayout>
      </>
   );
}
