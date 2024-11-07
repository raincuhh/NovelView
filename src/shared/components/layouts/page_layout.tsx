import { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren;

export default function PageLayout({
   children,
}: PageLayoutProps) {
   return (
      <>
         <div
            id="page"
            className="min-h-full flex flex-col"
         >
            <div className="flex-none"></div>
            <div className="h-[100dvh] min-h-[0px] w-full overflow-hidden">
               <div
                  id="out"
                  className="h-full bg-background-primary text-text-primary"
               >
                  {children}
               </div>
            </div>
         </div>
      </>
   );
}
