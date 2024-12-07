import React, { PropsWithChildren } from "react";

type AppLayoutProps = PropsWithChildren;

const AppLayout = ({ children }: AppLayoutProps): React.JSX.Element => {
   return (
      <>
         <div
            className="dark:bg-primary min-h-dvh h-dvh basis-0 flex-1 dark:sm:bg-primary-alt font-family-primary
               text-normal font-weight-md leading-relaxed"
         >
            <div className="flex h-full">{children}</div>
         </div>
      </>
   );
};

export default AppLayout;
