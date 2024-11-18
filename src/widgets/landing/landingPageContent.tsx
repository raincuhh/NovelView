import React from "react";
import CenteredLayout from "../../shared/components/layout/centeredLayout";
import LandingBackgroundOverlay from "./landingBackgroundOverlay";
import LandingHeader from "./landingHeader";
import LandingActions from "./landingActions";

export default function LandingPageContent(): React.JSX.Element {
   return (
      <>
         <CenteredLayout maxWidth="sm:max-w-sm md:max-w-md">
            <LandingBackgroundOverlay />
            <LandingHeader />
            <LandingActions />
         </CenteredLayout>
      </>
   );
}
