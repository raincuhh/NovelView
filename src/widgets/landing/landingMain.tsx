import React from "react";
import LandingBackgroundOverlay from "./landingBackgroundOverlay";
import LandingHeader from "./landingHeader";
import LandingActions from "./landingActions";

type LandingMainProps = {};

export default function LandingMain({}: LandingMainProps): React.JSX.Element {
   return (
      <>
         <main className="py-16 px-2 mx-auto w-[50rem] max-w-[90%] h-full">
            <div className="flex flex-col select-none h-full justify-end relative c-min-h-668:justify-center">
               <LandingBackgroundOverlay />
               <LandingHeader />
               <LandingActions />
            </div>
         </main>
      </>
   );
}
