import React from "react";
import { PropsWithChildren } from "react";
import withProvider from "../../shared/components/utils/withProvider";
import pipe from "../../shared/lib/pipe";

import AuthProvider from "../../features/auth/providers/authProvider";
import TitlebarProvider from "../../shared/providers/titlebarProvider";
import ModalProvider from "../../shared/providers/modalProvider";
import NotificationProvider from "../../shared/providers/notificationProvider";
import TooltipProvider from "../../shared/providers/tooltipProvider";

type AppProvidersProps = PropsWithChildren<{}>;

export default function AppProviders({ children }: AppProvidersProps): React.JSX.Element {
   const AppWithProviders = pipe(
      withProvider(TitlebarProvider),
      withProvider(TooltipProvider),
      withProvider(NotificationProvider),
      withProvider(ModalProvider),
      withProvider(AuthProvider),
   )((props: PropsWithChildren<{}>) => <>{props.children}</>);

   return (
      <>
         <AppWithProviders>{children}</AppWithProviders>
      </>
   );
}
