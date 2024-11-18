import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren & { id: string };

export default function PageLayout({ children, id }: PageLayoutProps): React.JSX.Element {
   return (
      <>
         <div id="page" className="flex min-h-full flex-col">
            <div className="flex-none"></div>
            <div className="h-dvh min-h-full w-full overflow-hidden">
               <div className="dark:bg-background-primary-mobile dark:sm:bg-background-primary dark:text-text-normal h-full">
                  <div id={id} className="h-full">
                     {children}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
