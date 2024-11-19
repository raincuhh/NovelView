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
   const hrefs: Record<AuthModeTypes, string> = {
      register: "login",
      login: "register",
   };
   const labels: Record<AuthModeTypes, string> = {
      register: "Login",
      login: "Register",
   };

   const desc = descs[type];
   const href = hrefs[type];
   const label = labels[type];

   return (
      <>
         <div className="my-6 text-center font-family-primary font-weight-md dark:text-text-muted">
            {desc}{" "}
            <Link to={`/${href}`}>
               <span className="underline transition-colors duration-100 ease-in-out dark:text-text-normal dark:hover:text-brand-700">
                  {label}
               </span>
            </Link>
         </div>
      </>
   );
}
