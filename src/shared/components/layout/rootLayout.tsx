import React, { PropsWithChildren } from "react";

type RootLayoutProps = PropsWithChildren & {};

const RootLayout = ({ children }: RootLayoutProps): React.JSX.Element => {
   return <>{children}</>;
};

export default RootLayout;
