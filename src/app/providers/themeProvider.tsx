import React, { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren;

const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
   return <>{children}</>;
};

export default ThemeProvider;
