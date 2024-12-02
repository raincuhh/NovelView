import React, { useEffect } from "react";

import LandingViewsHeader from "./landingViewsHeader";
import ViewNavProviderRoot from "../utils/viewNavProviderRoot";
import useViewNav from "../../hooks/useViewNav";

const LandingRegisterView = (): React.JSX.Element => {
   const { setNavTitle } = useViewNav();

   useEffect(() => {
      console.log("setNavTitle: Create Account");
      setNavTitle("Create Account");
   }, [setNavTitle]);

   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <div className="mt-4 sm:mt-2 pb-2">
               <LandingViewsHeader type="register" />
            </div>
            <div className="border-solid sm:border-t-[1px] border-modifier-border-color">
               test
            </div>
         </div>
      </>
   );
};

export default LandingRegisterView;
