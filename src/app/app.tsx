import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AuthProvider from "../features/auth/components/auth_provider";
import "../shared/lib/fontawesome";
import "../../public/css/global.css";
import { NativeWindowButtons } from "../shared/components/native_window_buttons";

export default function App(): JSX.Element {
   return (
      <>
         <div id="app">
            <NativeWindowButtons />
            <AuthProvider>
               <RouterProvider router={router} />
            </AuthProvider>
         </div>
      </>
   );
}
