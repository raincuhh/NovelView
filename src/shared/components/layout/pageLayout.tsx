import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren & { id: string };

export default function PageLayout({ children, id }: PageLayoutProps): JSX.Element {
   return (
      <>
         <div className="flex flex-col min-h-full">
            <div className="flex-none"></div>
            <div className="w-full min-h-full overflow-hidden h-dvh">
               <div
                  className="h-full bg-background-primary-light text-text-normal-light
                     sm:bg-background-primary-alt-light dark:bg-background-primary-dark
                     dark:text-text-normal-dark dark:sm:bg-background-primary-alt-dark"
               >
                  <main id={id} className="h-full overflow-y-scroll">
                     {children}
                  </main>
               </div>
            </div>
         </div>
      </>
   );
}
