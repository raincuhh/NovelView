import React, { useEffect } from "react";

import LandingViewsHeader from "../landingViewsHeader";
import ViewNavProviderRoot from "../../utils/viewNavProviderRoot";
import useViewNav from "@/pages/landing/hooks/useViewNav";

const LandingLoginView = (): React.JSX.Element => {
   const { setNavTitle } = useViewNav();

   useEffect(() => {
      setNavTitle("Login");
   }, [setNavTitle]);

   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <div className="mt-4 sm:mt-2 pb-2">
               <LandingViewsHeader type="login" />
            </div>
            <div className="border-solid sm:border-t-[1px] border-modifier-border-color">
               test
            </div>
         </div>
      </>
   );
};

export default LandingLoginView;
