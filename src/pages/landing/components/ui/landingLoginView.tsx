import React from "react";

import ViewNavProviderRoot from "../utils/viewNavProviderRoot";
import { AuthHeader } from "@/features/auth";
import { AuthActions } from "@/features/auth";

const LandingLoginView = (): React.JSX.Element => {
   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <div className="mt-4 sm:mt-2 pb-2">
               <AuthHeader type="login" />
            </div>
            <div className="border-solid sm:border-t-[1px] border-modifier-border-color">
               test
            </div>
         </div>
      </>
   );
};

export default LandingLoginView;
