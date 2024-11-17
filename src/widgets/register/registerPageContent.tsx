import React from "react";
import NavStateProvider from "../../features/auth/providers/navStateProvider";
import RegisterMain from "./registerMain";

export default function RegisterPageContent(): React.JSX.Element {
   return (
      <>
         <div id="register" className="h-full">
            <div className="flex flex-col h-full">
               <NavStateProvider>
                  <RegisterMain />
               </NavStateProvider>
            </div>
         </div>
      </>
   );
}
