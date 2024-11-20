import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";
import AppProviders from "./providers/appProviders";
import RootLayout from "../shared/components/layout/rootLayout";
import ModalRoot from "../shared/components/utils/modalRoot";
import TooltipRoot from "../shared/components/utils/tooltipRoot";

import "../../public/css/satoshi.css";
import "../../public/css/global.css";

export default function App(): JSX.Element {
   useEffect(() => {
      //setting localstorage stuff.
   }, []);

   return (
      <>
         <AppProviders>
            <RootLayout>
               <RouterProvider router={appRouter} />
            </RootLayout>
            <ModalRoot />
            <TooltipRoot />
         </AppProviders>
      </>
   );
}
