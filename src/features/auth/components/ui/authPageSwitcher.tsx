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
         <div className="my-6 text-center dark:text-c-text-muted font-c-family-primary font-c-weight-md">
            {desc}{" "}
            <Link to={href}>
               <span className="underline text-c-text-normal dark:hover:text-c-brand-default transition-colors duration-100 ease-in-out">
                  {label}
               </span>
            </Link>
         </div>
      </>
   );
}
