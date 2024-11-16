import React from "react";
import { Link } from "react-router-dom";

export default function AuthFooter(): React.JSX.Element {
   return (
      <>
         <div className="text-center dark:text-c-text-faint font-c-family-primary text-c-fs-xs font-c-weight-md">
            By continuing, you acknowledge that you have read and agree to NovelView's{" "}
            <Link to={"#"}>
               <span className="dark:sm:hover:text-c-text-muted underline transition-colors duration-100 ease-in-out">
                  Terms of Service
               </span>
            </Link>{" "}
            and{" "}
            <Link to={"#"}>
               <span className="dark:sm:hover:text-c-text-muted underline transition-colors duration-100 ease-in-out">
                  Privacy Policy
               </span>
            </Link>
            .
         </div>
      </>
   );
}
