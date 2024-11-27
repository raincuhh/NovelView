import React from "react";
import LandingAction from "./landingAction";
import { LandingPageViews } from "./landingPageContent";

export default function LandingActions(): JSX.Element {
   return (
      <>
         <div className="flex justify-end z-layer-content">
            <div className="flex flex-col w-full">
               <div className="grid grid-cols-1 gap-2 sm:gap-2">
                  <LandingAction view={LandingPageViews.register} type="register" />
                  <LandingAction view={LandingPageViews.login} type="login" />
               </div>
            </div>
         </div>
      </>
   );
}
