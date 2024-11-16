import React, { PropsWithChildren } from "react";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
   return <>{children}</>;
}
