import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AuthProvider from "../features/auth/components/auth_provider";

export default function App(): JSX.Element {
   return (
      <>
         <div id="app">
            <AuthProvider>
               <RouterProvider router={router} />
            </AuthProvider>
         </div>
      </>
   );
}
