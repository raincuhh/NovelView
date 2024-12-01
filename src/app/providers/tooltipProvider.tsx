import React, { PropsWithChildren } from "react";

type TooltipProviderProps = PropsWithChildren & {};

const TooltipProvider = ({ children }: TooltipProviderProps): React.JSX.Element => {
   return <>{children}</>;
};

export default TooltipProvider;
