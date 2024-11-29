import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import MobileDetect from "mobile-detect";

import { appRouter } from "./routes/routes";

import "../../public/css/satoshi.css";
import "../../public/css/global.css";

export default function App(): JSX.Element {
   const mobileDetect: MobileDetect = new MobileDetect(window.navigator.userAgent);
   const isMobile = useMemo(
      () => mobileDetect.mobile() !== null || mobileDetect.tablet() !== null,
      [],
   );
   const isDesktop = !isMobile;

   useEffect(() => {
      //setting localstorage stuff.
   }, []);

   return (
      <>
         <AppProviders>
            <RootLayout>
               <RouterProvider router={appRouter} />
            </RootLayout>
            <ModalRoot />
            <TooltipRoot />
         </AppProviders>
      </>
   );
}
