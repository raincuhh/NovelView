import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AuthProvider from "./providers/auth_provider";
import EnvironmentProvider from "./providers/environment_provider";

import TitleBar from "../shared/components/titlebar";

import "../../public/css/global.css";
import "../shared/lib/fontawesome";
import "boxicons";
import { use_environment } from "../shared/lib/hooks";

export default function App(): JSX.Element {
   const { is_desktop, is_mobile } = use_environment();

   return (
      <>
         <div id="app">
            <EnvironmentProvider>
               {is_desktop && !is_mobile && (
                  <TitleBar
                     close_button={true}
                     minimize_button={true}
                  />
               )}
               <AuthProvider>
                  <RouterProvider router={router} />
               </AuthProvider>
            </EnvironmentProvider>
         </div>
      </>
   );
}
