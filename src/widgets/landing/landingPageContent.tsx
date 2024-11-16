import React from "react";
import LandingMain from "./landingMain";

export default function LandingPageContent(): React.JSX.Element {
   return (
      <>
         <div id="landing" className="h-full">
            <div className="flex flex-1 h-full lg:flex-row">
               <LandingMain />
            </div>
         </div>
      </>
   );
}
