import React from "react";
import LandingHomeAction from "./landingHomeAction";
import { LandingPageViews } from "../../types";
import LandingHomeHeader from "./landingHomeHeader";
import { useMediaQuery } from "@/shared/hooks";

const LandingHomeView = (): React.JSX.Element => {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <div className="flex flex-col w-full gap-16 sm:gap-20 items-center absolute py-16 sm:py-0">
            {isSm ? null : <LandingHomeHeader includeLogo={true} />}
            <div className="flex justify-end z-layer-content w-full">
               <div className="flex flex-col w-full border-solid sm:border-t-[1px] border-primary-alt">
                  <LandingHomeAction view={LandingPageViews.register} type="register" />
                  <LandingHomeAction view={LandingPageViews.login} type="login" />
                  <LandingHomeAction
                     view={LandingPageViews.createLibrary}
                     type="createLibrary"
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default LandingHomeView;
