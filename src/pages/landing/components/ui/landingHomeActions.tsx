import React from "react";

import LandingAction from "./landingAction";
import { LandingPageViews } from "../../types";

const LandingActions = (): React.JSX.Element => {
   return (
      <>
         <div className="flex justify-end z-layer-content w-full">
            <div className="flex flex-col w-full border-solid sm:border-t-[1px] border-primary-alt">
               <LandingAction view={LandingPageViews.register} type="register" />
               <LandingAction view={LandingPageViews.login} type="login" />
            </div>
         </div>
      </>
   );
};

export default LandingActions;
