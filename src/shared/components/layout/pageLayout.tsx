import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren & { id: string };

export default function PageLayout({ children, id }: PageLayoutProps): JSX.Element {
   return (
      <>
         <div className="flex flex-col min-h-full font-family-primary text-text-normal font-weight-md">
            <div className="flex-none"></div>
            <div className="w-full min-h-full overflow-hidden h-dvh">
               <div className="h-full dark:bg-background-primary dark:text-text-normal dark:sm:bg-background-primary-alt">
                  <main id={id} className="h-full overflow-y-scroll">
                     {children}
                  </main>
               </div>
            </div>
         </div>
      </>
   );
}
