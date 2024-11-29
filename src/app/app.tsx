import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";
import AppProviders from "./providers/appProviders";
import { RootLayout } from "@/shared/components/layout";
import { ModalRoot, TooltipRoot } from "@/shared/components/utils";

const App = (): React.JSX.Element => {
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
};

export default App;
