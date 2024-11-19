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
         <div className="dark:text-text-muted my-6 text-center font-family-primary font-weight-md">
            {desc}{" "}
            <Link to={`/${href}`}>
               <span className="dark:text-text-normal dark:hover:text-brand-700 underline transition-colors duration-100 ease-in-out">
                  {label}
               </span>
            </Link>
         </div>
      </>
   );
}
