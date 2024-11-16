import { PropsWithChildren } from "react";

type RootLayoutProps = PropsWithChildren & {};

export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <>
         <div className="flex"></div>
         {children}
      </>
   );
}
