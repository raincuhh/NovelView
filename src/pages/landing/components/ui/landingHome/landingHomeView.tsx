import React from "react";

import { useAuth } from "@/features/auth";
import LandingHomeAction from "./landingHomeAction";
import { LandingPageViews } from "@/pages/landing/types";
import LandingHomeHeader from "./landingHomeHeader";
import { useMediaQuery } from "@/shared/hooks";
import LandingCategoryLayout from "../../layouts/landingCategoryLayout";

const LandingHomeView = (): React.JSX.Element => {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });
   const { isAuth } = useAuth();

   return (
      <>
         <div className="flex flex-col w-full gap-16 sm:gap-20 items-center absolute py-16 sm:py-0">
            {isSm ? null : <LandingHomeHeader includeLogo={true} />}
            <div className="flex justify-end z-layer-content w-full">
               <LandingCategoryLayout id="landing-actions" className="w-full">
                  <div
                     className="flex flex-col w-full border-solid border-t-[1px] sm:border-t-0
                        border-modifier-border-color"
                  >
                     {!isAuth && (
                        <>
                           <LandingHomeAction
                              view={LandingPageViews.register}
                              type="register"
                           />
                           <LandingHomeAction
                              view={LandingPageViews.login}
                              type="login"
                           />
                        </>
                     )}
                     <LandingHomeAction type="quickStart" />
                  </div>
               </LandingCategoryLayout>
            </div>
         </div>
      </>
   );
};

export default LandingHomeView;
