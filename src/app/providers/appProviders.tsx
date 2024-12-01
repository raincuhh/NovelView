import React, { PropsWithChildren } from "react";

import pipe from "@/shared/lib/pipe";
import withProvider from "@/shared/components/utils/withProvider";
import TitlebarProvider from "./titlebarProvider";
import NotificationProvider from "./notificationProvider";
import ModalProvider from "./modalProvider";
import { AuthProvider } from "@/features/auth/providers";
import ThemeProvider from "./themeProvider";
import TooltipProvider from "./tooltipProvider";

type AppProvidersProps = PropsWithChildren<{}>;

const AppProviders = ({ children }: AppProvidersProps): React.JSX.Element => {
   const AppWithProviders: React.ComponentType<PropsWithChildren> = pipe(
      withProvider(TitlebarProvider),
      withProvider(ThemeProvider),
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
};

export default AppProviders;
