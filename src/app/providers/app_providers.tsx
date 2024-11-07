import { PropsWithChildren } from "react";
import AuthProvider from "./auth_provider";
import EnvironmentProvider from "./environment_provider";

type AppProvidersProps = PropsWithChildren;

export default function AppProviders({
   children,
}: AppProvidersProps) {
   return (
      <>
         <EnvironmentProvider>
            <AuthProvider>{children}</AuthProvider>
         </EnvironmentProvider>
      </>
   );
}
