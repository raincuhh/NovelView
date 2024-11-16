import React from "react";
import LoginMain from "./loginMain";
import NavStateProvider from "../../features/auth/providers/navStateProvider";

export default function LoginPageContent(): React.JSX.Element {
   return (
      <>
         <div id="login" className="h-full">
            <div className="flex flex-col h-full">
               <NavStateProvider>
                  <LoginMain />
               </NavStateProvider>
            </div>
         </div>
      </>
   );
}
