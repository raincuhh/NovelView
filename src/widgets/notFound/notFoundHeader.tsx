import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundHeader(): JSX.Element {
   return (
      <header className="flex flex-col gap-4 text-center font-family-primary">
         <h1 className="dark:text-text-normal text-fs-xl font-weight-xl sm:text-fs-2xl">
            You found an unresolved link.
         </h1>
         <p className="dark:text-text-muted font-weight-md">
            We would note this, but we dont track visitors. If something seems wrong, feel
            free to contact{" "}
            <span className="">
               <Link to={""}>support</Link>
            </span>
            .
         </p>
      </header>
   );
}
