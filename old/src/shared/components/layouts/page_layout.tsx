import { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren;

export default function PageLayout({ children }: PageLayoutProps) {
   return (
      <>
         <div id="page" className="flex min-h-full flex-col">
            <div className="flex-none"></div>
            <div className="h-[100dvh] min-h-[0px] w-full overflow-hidden">
               <div
                  id="out"
                  className="dark:bg-c-background-primary text-c-text-normal h-full"
               >
                  {children}
               </div>
            </div>
         </div>
      </>
   );
}
