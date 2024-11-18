import React, { PropsWithChildren } from "react";

type NotificationProviderProps = PropsWithChildren;

export default function NotificationProvider({ children }: NotificationProviderProps) {
   return <>{children}</>;
}
