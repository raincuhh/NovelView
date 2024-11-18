import React, { PropsWithChildren } from "react";

type TooltipProviderProps = PropsWithChildren & {};

export default function TooltipProvider({ children }: TooltipProviderProps) {
   return <>{children}</>;
}
