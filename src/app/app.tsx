import React from "react";
import { RouterProvider } from "react-router-dom";

import { appRouter } from "./routes/routes";
import AppProviders from "./providers/appProviders";
import { ModalRoot, TooltipRoot } from "@/shared/components/utils";

const App = (): React.JSX.Element => {
   return (
      <>
         <AppProviders>
            <RouterProvider router={appRouter} />
            <ModalRoot />
            <TooltipRoot />
         </AppProviders>
      </>
   );
};

export default App;
