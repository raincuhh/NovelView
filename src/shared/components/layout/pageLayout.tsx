// import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren & { id: string };

export default function PageLayout({ children, id }: PageLayoutProps): JSX.Element {
   return (
      <>
         <div className="flex flex-col min-h-full font-family-primary text-normal font-weight-md">
            <div className="flex-none"></div>
            <div className="w-full min-h-full overflow-hidden h-dvh">
               <div className="h-full dark:bg-primary dark:text-normal dark:sm:bg-primary-alt">
                  <main id={id} className="h-full overflow-y-scroll">
                     {children}
                  </main>
               </div>
            </div>
         </div>
      </>
   );
}
