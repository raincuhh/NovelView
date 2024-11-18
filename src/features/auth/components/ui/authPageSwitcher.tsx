import React from "react";
import { Link } from "react-router-dom";
import { AuthFormTypes } from "../../lib/types";

type AuthPageSwitcherProps = {
   type: AuthFormTypes;
};

export default function AuthPageSwitcher({ type }: AuthPageSwitcherProps) {
   const descs: Record<AuthFormTypes, string> = {
      register: "Dont have an account?",
      login: "Already have an account?",
   };
   const hrefs: Record<AuthFormTypes, string> = {
      register: "/register",
      login: "/login",
   };
   const labels: Record<AuthFormTypes, string> = {
      register: "Register",
      login: "Login",
   };

   const desc = descs[type];
   const href = hrefs[type];
   const label = labels[type];

   return (
      <>
         <div className="my-6 text-center font-family-primary font-weight-md dark:text-text-muted">
            {desc}{" "}
            <Link to={href}>
               <span className="underline transition-colors duration-100 ease-in-out dark:text-text-normal dark:hover:text-brand-700">
                  {label}
               </span>
            </Link>
         </div>
      </>
   );
}
