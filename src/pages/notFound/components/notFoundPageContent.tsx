import React from "react";
// import CenteredLayout from "../../../shared/components/layout/centeredLayout";
// import NotFoundHeader from "./notFoundHeader";
import { Link } from "react-router-dom";

export default function NotFoundPageContent() {
   return (
      <CenteredLayout maxWidth="sm:max-w-sm">
         <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
               <div className="mb-2 text-center font-family-primary font-weight-xl dark:text-faint">
                  404
               </div>
               <NotFoundHeader />
               <div className="mt-2 font-family-primary text-accent hover:text-accent-hover text-fs-md font-weight-md">
                  <Link to={"/"}>Go back to home.</Link>
               </div>
            </div>
         </div>
      </CenteredLayout>
   );
}
