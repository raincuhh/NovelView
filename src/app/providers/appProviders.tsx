import React, { PropsWithChildren } from "react";

type AppProvidersProps = PropsWithChildren<{}>;

export default function AppProviders({ children }: AppProvidersProps): JSX.Element {
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
