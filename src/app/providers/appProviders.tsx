import React from "react";
import { PropsWithChildren } from "react";
import withProvider from "../../shared/components/utils/withProvider";
import pipe from "../../shared/lib/pipe";

import AuthProvider from "../../features/auth/providers/authProvider";

type AppProvidersProps = PropsWithChildren<{}>;

export default function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
   const AppWithProviders = pipe(withProvider(AuthProvider))((props: PropsWithChildren<{}>) => (
      <>{props.children}</>
   ));

   return (
      <>
         <AppWithProviders>{children}</AppWithProviders>
      </>
   );
}
