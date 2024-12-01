import React from "react";
import ViewNavProviderRoot from "../utils/viewNavProviderRoot";
import { useViewSwitcher } from "@/shared/hooks";
import { LandingPageViews } from "../../types";

const LandingLoginView = (): React.JSX.Element => {
   const { currentView } = useViewSwitcher<LandingPageViews>();

   return (
      <>
         <ViewNavProviderRoot />
         <div>login</div>
      </>
   );
};

export default LandingLoginView;
