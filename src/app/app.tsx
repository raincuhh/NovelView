import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";
import AppProviders from "./providers/appProviders";
import RootLayout from "../shared/components/layout/rootLayout";

import "../../public/css/satoshi.css";
import "../../public/css/global.css";

export default function App(): React.JSX.Element {
   return (
      <>
         <AppProviders>
            <RootLayout>
               <RouterProvider router={appRouter} />
            </RootLayout>
         </AppProviders>
      </>
   );
}
