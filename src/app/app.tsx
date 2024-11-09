import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AppProviders from "./providers/app_providers";

import "../../public/css/satoshi.css";
import "../../public/css/global.css";
import "../shared/lib/fontawesome";
import RootLayout from "../shared/components/layouts/root_layout";

export default function App(): JSX.Element {
   return (
      <>
         <AppProviders>
            <RootLayout>
               <RouterProvider router={router} />
            </RootLayout>
         </AppProviders>
      </>
   );
}
