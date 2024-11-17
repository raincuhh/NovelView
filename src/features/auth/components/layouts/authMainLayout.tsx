import React, { PropsWithChildren } from "react";

type AuthMainLayoutProps = PropsWithChildren;

export default function AuthMainLayout({ children }: AuthMainLayoutProps) {
   return (
      <>
         <main className="py-6 px-2 mx-auto w-[50rem] max-w-[90%] h-full">
            <div className="flex flex-col select-none h-full relative justify-start c-min-h-668:justify-center">
               {children}
            </div>
         </main>
      </>
   );
}
