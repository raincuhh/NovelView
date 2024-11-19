import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type LandingMainProps = PropsWithChildren & { maxWidth?: string; justify?: string };

export default function CenteredLayout({
   children,
   maxWidth = "sm:max-w-md",
   justify = "justify-end sm:justify-center",
}: LandingMainProps): JSX.Element {
   return (
      <>
         <div className="flex min-h-full w-full flex-col justify-center">
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
}
