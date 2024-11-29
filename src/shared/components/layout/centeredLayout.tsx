import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type LandingMainProps = PropsWithChildren & {
   maxWidth?: string;
   justify?: string;
   justifyChildren?: string;
   className?: string;
};

const CenteredLayout = ({
   children,
   maxWidth = "sm:max-w-md",
   justify = "justify-end sm:justify-center",
   justifyChildren = "justify-center",
   className,
}: LandingMainProps): React.JSX.Element => {
   return (
      <>
         <div
            className={clsx(
               "flex flex-col w-full min-h-full",
               justifyChildren,
               className,
            )}
         >
            <div className={clsx("flex min-h-full flex-col px-4 lg:px-8", justify)}>
               <div
                  className={clsx(
                     "relative flex select-none flex-col py-8 sm:mx-auto sm:w-full",
                     maxWidth,
                  )}
               >
                  {children}
               </div>
            </div>
         </div>
      </>
   );
};

export default CenteredLayout;
