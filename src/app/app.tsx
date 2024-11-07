import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AuthProvider from "./providers/auth_provider";
import EnvironmentProvider from "./providers/environment_provider";

import TitleBar from "../shared/components/titlebar";

import "../../public/css/global.css";
import "../shared/lib/fontawesome";
import "boxicons";

export default function App(): JSX.Element {
   return (
      <>
         <div id="app">
            <EnvironmentProvider>
               <TitleBar />
               <AuthProvider>
                  <RouterProvider router={router} />
               </AuthProvider>
            </EnvironmentProvider>
         </div>
      </>
   );
}
