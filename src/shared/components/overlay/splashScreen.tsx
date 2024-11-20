import React from "react";
import MainLogo from "../ui/mainLogo";

export default function SplashScreen(): JSX.Element {
   return (
      <>
         <div
            className="pointer-events-none fixed z-layer-splash flex min-h-full min-w-full select-none flex-col
               overflow-hidden"
         >
            <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
               <MainLogo variant="purple" className="w-32 sm:w-44" />
            </div>
         </div>
      </>
   );
}
