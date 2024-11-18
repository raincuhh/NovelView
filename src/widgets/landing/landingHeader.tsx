import React, { useEffect, useState } from "react";
import MainLogo from "../../shared/components/ui/mainLogo";
import packageJson from "../../../package.json";
import useMediaQuery from "../../shared/hooks/useMediaQuery";

export default function LandingHeader(): React.JSX.Element {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });
   const [variant, setVariant] = useState<"white" | "purple">(isSm ? "white" : "purple");

   useEffect(() => {
      setVariant(isSm ? "white" : "purple");
   }, [isSm]);

   return (
      <>
         <div className="mb-16 flex flex-col items-center justify-center sm:mb-20">
            <div className="font-family-primary flex flex-col items-center">
               <MainLogo variant={variant} className="w-40 sm:w-48" />
               <header className="text-fs-xl font-weight-lg sm:font-weight-xl sm:text-fs-2xl mt-4 sm:mt-8">
                  NovelView
               </header>
               <p className="text-fs-xs font-weight-lg sm:text-fs-sm dark:text-text-faint">
                  v{packageJson.version}
               </p>
            </div>
         </div>
      </>
   );
}
