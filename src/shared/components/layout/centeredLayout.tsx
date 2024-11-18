import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type LandingMainProps = PropsWithChildren & { maxWidth?: string };

export default function CenteredLayout({
   children,
   maxWidth = "sm:max-w-md",
}: LandingMainProps): React.JSX.Element {
   return (
      <>
         <main className="flex min-h-full w-full flex-col justify-center">
            <div className="flex min-h-full flex-col justify-end px-4 sm:justify-center lg:px-8">
               <div
                  className={clsx("relative flex select-none flex-col py-8 sm:mx-auto sm:w-full", maxWidth)}
               >
                  {children}
               </div>
            </div>
         </main>
      </>
   );
}
