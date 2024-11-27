import React, { PropsWithChildren } from "react";
import { isTauri } from "@tauri-apps/api/core";

type AuthFormLayoutProps = PropsWithChildren & { id: string };

export default function AuthFormLayout({
   children,
   id,
}: AuthFormLayoutProps): JSX.Element {
   return (
      <>
         <div id={id} className={`${isTauri() ? "mt-10" : ""}`}>
            <div className="flex flex-col items-center justify-center w-full">
               {children}
            </div>
         </div>
      </>
   );
}
