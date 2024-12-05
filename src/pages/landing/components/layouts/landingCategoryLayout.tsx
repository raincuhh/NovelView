import React, { PropsWithChildren } from "react";

type LandingCategoryLayoutProps = PropsWithChildren & { id?: string; className?: string };

const LandingCategoryLayout = ({
   children,
   id,
   className,
}: LandingCategoryLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className={`px-4 ${className}`} id={id}>
            {children}
         </div>
      </>
   );
};

export default LandingCategoryLayout;
