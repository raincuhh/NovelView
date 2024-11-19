import { PropsWithChildren } from "react";

type RootLayoutProps = PropsWithChildren & {};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
   return <>{children}</>;
}
