import React from "react";
// import { AuthModeTypes } from "../../lib/types";
// import AuthHeader from "./authHeader";
// import AuthForm from "./authForm";
// import AuthPageSwitcher from "./authPageSwitcher";
// import AuthFooter from "./authFooter";
// import { isTauri } from "@tauri-apps/api/core";

type AuthContentProps = { type: AuthModeTypes };

export default function AuthContent({ type }: AuthContentProps): JSX.Element {
   return (
      <>
         <div className="flex flex-col items-center justify-center w-full h-full font-family-primary font-weight-md">
            <div className="flex flex-col w-full">
               <AuthForm type={type} />
               {/* <AuthPageSwitcher type={type} /> */}
               {/* <AuthFooter /> */}
            </div>
         </div>
      </>
   );
}
