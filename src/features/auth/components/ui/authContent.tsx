import React from "react";
import { AuthModeTypes } from "../../lib/types";
import AuthHeader from "./authHeader";
import AuthForm from "./authForm";
import AuthPageSwitcher from "./authPageSwitcher";
import AuthFooter from "./authFooter";

type AuthContentProps = { type: AuthModeTypes };

export default function AuthContent({ type }: AuthContentProps): JSX.Element {
   return (
      <>
         <div className="flex h-full w-full flex-col items-center justify-center font-family-primary font-weight-md">
            <div className="flex flex-col">
               <AuthHeader type={type} />
               <AuthForm type={type} />
               <AuthPageSwitcher type={type} />
               {/* <AuthFooter /> */}
            </div>
         </div>
      </>
   );
}