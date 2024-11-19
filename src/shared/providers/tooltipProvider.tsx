import React, { PropsWithChildren } from "react";

type TooltipProviderProps = PropsWithChildren & {};

export default function TooltipProvider({ children }: TooltipProviderProps): JSX.Element {
   return <>{children}</>;
}
