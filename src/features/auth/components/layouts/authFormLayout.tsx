import React, { PropsWithChildren } from "react";

type AuthFormLayoutProps = PropsWithChildren & { id: string };

export default function AuthFormLayout({ children, id }: AuthFormLayoutProps): JSX.Element {
   return (
      <>
         <div id={id} className="mt-10">
            <div className="flex w-full flex-col items-center">{children}</div>
         </div>
      </>
   );
}
