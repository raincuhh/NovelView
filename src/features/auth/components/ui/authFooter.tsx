import React from "react";
import { Link } from "react-router-dom";

//TODO: make the actual website, which holds just general info, andstuff like privacy policy, etc.

export default function AuthFooter(): React.JSX.Element {
   return (
      <>
         <div className="mt-4 text-center font-family-primary text-fs-xs font-weight-md dark:text-text-faint">
            By continuing, you acknowledge that you have read and agree to NovelView's{" "}
            <Link to={"#"}>
               <span className="underline transition-colors duration-100 ease-in-out dark:hover:text-text-muted">
                  Terms of Service
               </span>
            </Link>{" "}
            and{" "}
            <Link to={"#"}>
               <span className="underline transition-colors duration-100 ease-in-out dark:hover:text-text-muted">
                  Privacy Policy
               </span>
            </Link>
            .
         </div>
      </>
   );
}
