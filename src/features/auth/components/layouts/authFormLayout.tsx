import React, { PropsWithChildren } from "react";
import { isTauri } from "../../../../shared/lib/tauri";

type AuthFormLayoutProps = PropsWithChildren;

export default function AuthFormLayout({ children }: AuthFormLayoutProps) {
   return (
      <>
         <div className="">{children}</div>
      </>
   );
}
