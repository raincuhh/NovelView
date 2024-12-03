import React from "react";

import { useEnvironment } from "@/shared/hooks";

type LandingViewsHeaderProps = { type: "login" | "register" | "createLibrary" };

const LandingViewsHeader = ({ type }: LandingViewsHeaderProps): React.JSX.Element => {
   const { isMobile } = useEnvironment();

   const actionConfig: Record<
      LandingViewsHeaderProps["type"],
      { title: string; desc: string }
   > = {
      register: {
         title: "Create Account",
         desc: "Sign up to unlock premium features and sync your library.",
      },
      login: {
         title: "Login",
         desc: "Access your libraries and read anywhere.",
      },
      createLibrary: {
         title: "New Library",
         desc: "Add a new library to organize your books.",
      },
   };

   const { title, desc } = actionConfig[type];

   return (
      <>
         <div className="flex flex-col pt-8 sm:pt-0 pb-2">
            <header className="text-fs-2xl sm:text-fs-xl font-weight-xl">{title}</header>
            {isMobile && <p className="text-muted text-fs-md font-weight-md">{desc}</p>}
         </div>
      </>
   );
};

export default LandingViewsHeader;
