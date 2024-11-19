import React, { PropsWithChildren } from "react";

type AuthFormLayoutProps = PropsWithChildren & { id: string };

export default function AuthFormLayout({ children, id }: AuthFormLayoutProps): React.JSX.Element {
   return (
      <>
         <div id={id} className="mt-10">
            <div className="flex flex-col">{children}</div>
         </div>
      </>
   );
}
