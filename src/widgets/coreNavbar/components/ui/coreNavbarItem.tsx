import { uppercaseify } from "@/shared/lib";
import React from "react";
import { Link } from "react-router-dom";

type CoreNavbarItemProps = { iconElement: React.JSX.Element; text: string; to?: string };

const CoreNavbarItem = ({
   iconElement,
   text,
   to,
}: CoreNavbarItemProps): React.JSX.Element => {
   return (
      <>
         {to && (
            <>
               <Link to={to} className="flex flex-col justify-center items-center gap-1">
                  <div className="">{iconElement}</div>
                  <div className="text-fs-sm media-min-w-400:text-fs-md font-weight-lg text-muted">
                     {text}
                  </div>
               </Link>
            </>
         )}
         {!to && (
            <>
               <div className="flex flex-col justify-center items-center gap-1">
                  <div>{iconElement}</div>
                  <div className="text-fs-sm media-min-w-400:text-fs-md font-weight-lg text-muted">
                     {uppercaseify(text)}
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default CoreNavbarItem;
