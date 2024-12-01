import React from "react";

import { LandingPageViews } from "../../types";
import LandingHeader from "./landingHeader";
import LandingActions from "./landingHomeActions";
import { useMediaQuery } from "@/shared/hooks";

const LandingHomeView = (): React.JSX.Element => {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <div className="flex flex-col w-full gap-16 sm:gap-20 items-center absolute py-16 sm:py-0">
            {isSm ? null : <LandingHeader includeLogo={true} />}
            <LandingActions />
         </div>
      </>
   );
};

export default LandingHomeView;
