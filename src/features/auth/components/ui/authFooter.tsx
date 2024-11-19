import React from "react";
import { Link } from "react-router-dom";

//TODO: make the actual website, which holds just general info, andstuff like privacy policy, etc.

export default function AuthFooter(): JSX.Element {
   return (
      <>
         <div className="dark:text-text-faint mt-4 text-center font-family-primary text-fs-xs font-weight-md">
            By continuing, you acknowledge that you have read and agree to NovelView's{" "}
            <Link to={"#"}>
               <span className="dark:hover:text-text-muted underline transition-colors duration-100 ease-in-out">
                  Terms of Service
               </span>
            </Link>{" "}
            and{" "}
            <Link to={"#"}>
               <span className="dark:hover:text-text-muted underline transition-colors duration-100 ease-in-out">
                  Privacy Policy
               </span>
            </Link>
            .
         </div>
      </>
   );
}
