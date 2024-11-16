import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";
import AppProviders from "./providers/appProviders";

import "../../public/css/satoshi.css";
import "../../public/css/global.css";
// import "../shared/lib/fontawesome";
import RootLayout from "../shared/components/layout/rootLayout";

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
