import React from "react";
import { AuthHeader } from "@/features/auth";
import ViewNavProviderRoot from "../utils/viewNavProviderRoot";

const LandingRegisterView = (): React.JSX.Element => {
   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <div className="mt-4 sm:mt-2 pb-2">
               <AuthHeader type="register" />
            </div>
            <div className="border-solid sm:border-t-[1px] border-modifier-border-color">
               test
            </div>
         </div>
      </>
   );
};

export default LandingRegisterView;
