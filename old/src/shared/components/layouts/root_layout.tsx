import { PropsWithChildren } from "react";

import SplashScreen from "../utils/splash_screen";

type RootLayoutProps = PropsWithChildren & {};

export default function RootLayout({ children }: RootLayoutProps) {
   // modals
   // splashscreen
   return (
      <>
         <SplashScreen />
         <div className="flex"></div>
         {children}
      </>
   );
}
