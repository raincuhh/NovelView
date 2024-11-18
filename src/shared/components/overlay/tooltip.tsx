import React, { PropsWithChildren } from "react";

type TooltipProps = PropsWithChildren & {};

export default function Tooltip({ children }: TooltipProps): React.JSX.Element {
   return (
      <>
         <div className=""></div>
      </>
   );
}
