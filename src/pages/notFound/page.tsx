import React from "react";
import { Link } from "react-router-dom";
import CenteredLayout from "../../shared/components/layout/centeredLayout";

export default function NotFoundPage(): JSX.Element {
   return (
      <>
         <CenteredLayout maxWidth="sm:max-w-sm">
            <div className="flex items-center justify-center">
               <div className="flex flex-col items-center justify-center">
                  <div className="mb-2 text-center font-family-primary font-weight-xl dark:text-text-faint">
                     404
                  </div>
                  <header className="flex flex-col gap-4 text-center font-family-primary">
                     <h1 className="dark:text-text-normal text-fs-xl font-weight-xl sm:text-fs-2xl">
                        You found an unresolved link.
                     </h1>
                     <p className="dark:text-text-muted font-weight-md">
                        We would note this, but we dont track visitors. If something seems
                        wrong, feel free to contact{" "}
                        <span className="">
                           <Link to={""}>support</Link>
                        </span>
                        .
                     </p>
                  </header>
                  <div
                     className="mt-2 font-family-primary text-text-accent hover:text-text-accent-hover text-fs-md font-weight-md"
                  >
                     <Link to={"/"}>Go back to home.</Link>
                  </div>
               </div>
            </div>
         </CenteredLayout>
      </>
   );
}
