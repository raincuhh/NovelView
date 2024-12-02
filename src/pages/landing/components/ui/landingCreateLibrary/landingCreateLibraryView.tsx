import React, { useEffect } from "react";

import LandingViewsHeader from "../landingViewsHeader";
import ViewNavProviderRoot from "../../utils/viewNavProviderRoot";
import useViewNav from "@/pages/landing/hooks/useViewNav";
import { AuthForm } from "@/features/auth";
import CreateLibraryForm from "./createLibraryForm";

const LandingCreateLibraryView = (): React.JSX.Element => {
   const { setNavTitle } = useViewNav();

   useEffect(() => {
      setNavTitle("Create Library");
   }, [setNavTitle]);

   return (
      <>
         <div className="flex flex-col">
            <ViewNavProviderRoot />
            <LandingViewsHeader type="createLibrary" />
            <CreateLibraryForm />
         </div>
      </>
   );
};

export default LandingCreateLibraryView;
