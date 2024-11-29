// import React, { useState, useEffect, PropsWithChildren, Suspense } from "react";

type SuspenseWithDelayProps = PropsWithChildren & {
   fallback: JSX.Element;
   delay: number;
};

export default function SuspenseWithDelay({
   children,
   fallback,
   delay = 300,
}: SuspenseWithDelayProps): JSX.Element {
   const [showFallback, setShowFallback] = useState<boolean>(false);

   useEffect(() => {
      const timer = setTimeout(() => setShowFallback(true), delay);

      return () => clearTimeout(timer);
   }, [delay]);

   return (
      <>
         <Suspense fallback={showFallback ? fallback : null}>{children}</Suspense>
      </>
   );
}
