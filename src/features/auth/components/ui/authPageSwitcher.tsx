import React from "react";
import { Link } from "react-router-dom";

type AuthPageSwitcherProps = {
   desc: string;
   href: string;
   label: string;
};

export default function AuthPageSwitcher({ desc, href, label }: AuthPageSwitcherProps) {
   return (
      <>
         <div className="dark:text-text-muted font-family-primary font-weight-md my-6 text-center">
            {desc}{" "}
            <Link to={href}>
               <span className="dark:text-text-normal dark:hover:text-brand-700 underline transition-colors duration-100 ease-in-out">
                  {label}
               </span>
            </Link>
         </div>
      </>
   );
}
