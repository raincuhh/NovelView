import React, { PropsWithChildren } from "react";

type HomeCategoryLayoutProps = PropsWithChildren & { id?: string };

const HomeCategoryLayout = ({
   children,
   id,
}: HomeCategoryLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className="px-4" id={id}>
            {children}
         </div>
      </>
   );
};

export default HomeCategoryLayout;
