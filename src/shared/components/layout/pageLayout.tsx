import React, { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren;

export default function PageLayout({ children }: PageLayoutProps): React.JSX.Element {
   return (
      <>
         <div id="page" className="min-h-full flex flex-col">
            <div className="flex-none"></div>
            <div className="h-dvh min-h-0 w-full overflow-hidden">
               <div className="h-full dark:bg-c-background-primary text-c-text-normal">{children}</div>
            </div>
         </div>
      </>
   );
}
