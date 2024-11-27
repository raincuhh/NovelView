import React from "react";
import LandingHeader from "./landingHeader";
import LandingActions from "./landingActions";
import { useViewSwitcher } from "../../shared/hooks/useViewSwitcher";

export default function LandingHomeView() {
   return (
      <>
         <div className="flex flex-col gap-16 sm:gap-20">
            <LandingHeader />
            <LandingActions />
         </div>
      </>
   );
}
