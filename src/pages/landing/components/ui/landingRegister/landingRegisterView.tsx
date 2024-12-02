import React, { useEffect } from "react";

import LandingViewsHeader from "../landingViewsHeader";
import ViewNavProviderRoot from "../../utils/viewNavProviderRoot";
import useViewNav from "@/pages/landing/hooks/useViewNav";
import { AuthForm } from "@/features/auth";

const LandingRegisterView = (): React.JSX.Element => {
   const { setNavTitle } = useViewNav();

   useEffect(() => {
      setNavTitle("Create Account");
   }, [setNavTitle]);

   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <LandingViewsHeader type="register" />
            <AuthForm type="register" />
         </div>
      </>
   );
};

export default LandingRegisterView;
