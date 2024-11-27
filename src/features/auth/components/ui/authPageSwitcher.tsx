import React from "react";
import { Link } from "react-router-dom";
import { AuthModeTypes } from "../../lib/types";

type AuthPageSwitcherProps = {
   type: AuthModeTypes;
};

export default function AuthPageSwitcher({ type }: AuthPageSwitcherProps): JSX.Element {
   const descs: Record<AuthModeTypes, string> = {
      register: "Already have an account?",
      login: "Dont have an account?",
   };
   const labels: Record<AuthModeTypes, string> = {
      register: "Login",
      login: "Register",
   };

   const desc = descs[type];
   const label = labels[type];

   return (
      <>
         <div className="my-6 text-center dark:text-muted font-family-primary font-weight-md">
            {desc}{" "}
            <span className="underline transition-colors duration-100 ease-in-out dark:hover:text-normal">
               {label}
            </span>
         </div>
      </>
   );
}
