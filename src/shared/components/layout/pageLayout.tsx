import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren & { id: string };

export default function PageLayout({ children, id }: PageLayoutProps): React.JSX.Element {
   return (
      <>
         <div className="flex min-h-full flex-col">
            <div className="flex-none"></div>
            <div className="h-dvh min-h-full w-full overflow-hidden">
               <div className="h-full dark:bg-background-primary-mobile dark:text-text-normal dark:sm:bg-background-primary">
                  <main id={id} className="h-full">
                     {children}
                  </main>
               </div>
            </div>
         </div>
      </>
   );
}
