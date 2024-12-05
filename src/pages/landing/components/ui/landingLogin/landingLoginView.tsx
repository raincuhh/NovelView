import React, { useEffect } from "react";

import LandingViewsHeader from "../landingViewsHeader";
import ViewNavProviderRoot from "../../utils/viewNavProviderRoot";
import useViewNav from "@/pages/landing/hooks/useViewNav";
import { AuthForm } from "@/features/auth";
import { useEnvironment } from "@/shared/hooks";
import LandingCategoryLayout from "../../layouts/landingCategoryLayout";

const LandingLoginView = (): React.JSX.Element => {
   const { setNavTitle } = useViewNav();

   useEffect(() => {
      setNavTitle("Login");
   }, [setNavTitle]);

   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <LandingCategoryLayout>
               <LandingViewsHeader type="login" />
            </LandingCategoryLayout>
            <LandingCategoryLayout>
               <AuthForm type="login" />
            </LandingCategoryLayout>
         </div>
      </>
   );
};

export default LandingLoginView;
