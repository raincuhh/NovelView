import { PropsWithChildren } from "react";

type AppProvidersProps = PropsWithChildren;

export default function AppProviders({ children }: AppProvidersProps) {
   return <>{children}</>;
}
