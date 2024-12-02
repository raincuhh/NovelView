import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { isTauri as packageIsTauri } from "@tauri-apps/api/core";
import { Capacitor } from "@capacitor/core";
import MobileDetect from "mobile-detect";

import { EnvironmentContext } from "@/shared/hooks/useEnvironment";
import { useMediaQuery } from "@/shared/hooks";
import { TitlebarButtonTypes } from "@/shared/types";
import { TitlebarButton } from "@/shared/components/ui";

type EnvironmentProviderProps = PropsWithChildren;

const EnvironmentProvider = ({
   children,
}: EnvironmentProviderProps): React.JSX.Element => {
   const [isTauri, setIsTauri] = useState<boolean>(false);
   const [isCapacitor, setIsCapacitor] = useState<boolean>(false);
   const [isMobile, setIsMobile] = useState<boolean>(false);
   const [showTitlebar, setShowTitlebar] = useState<boolean>(false);
   const [isProd, setIsProd] = useState<boolean>(false);
   const [isDev, setIsDev] = useState<boolean>(false);
   const [osInfo, setOsInfo] = useState<string>("");
   const [titlebarButtons, setTitlebarButtons] = useState<TitlebarButtonTypes[]>([
      "minimize",
      "maximize",
      "close",
   ]);

   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   useEffect(() => {
      (async () => {
         const tauriDetected = await packageIsTauri();
         setIsTauri(tauriDetected);
         setIsCapacitor(Capacitor.isNativePlatform());

         if (tauriDetected) {
            setShowTitlebar(true);
            setOsInfo("tauri-desktop");
         } else if (Capacitor.getPlatform()) {
            setShowTitlebar(false);
            setOsInfo(Capacitor.getPlatform());
         } else {
            setShowTitlebar(false);
            setOsInfo("web");
         }
      })();

      setIsProd(import.meta.env.MODE === "production");
      setIsDev(import.meta.env.MODE === "development");

      const md = new MobileDetect(window.navigator.userAgent);
      setIsMobile(!!md.mobile() || !isSm || Capacitor.isNativePlatform());
   }, [isSm]);

   useEffect(() => {
      // console.log("<======= EnvInfo =========>");
      // console.log("tauri: ", isTauri);
      // console.log("titlebar: ", showTitlebar);
      // console.log("capacitor: ", isCapacitor);
      // console.log("mobile: ", isMobile);
      // console.log("prod: ", isProd);
      // console.log("dev: ", isDev);
      // console.log("osinfo: ", osInfo);
   }, [isTauri, showTitlebar, isCapacitor, isMobile, isProd, isDev, osInfo]);

   const contextValue = useMemo(
      () => ({
         isTauri,
         isCapacitor,
         isMobile,
         showTitlebar,
         isProd,
         isDev,
         osInfo,
         setTitlebarButtons,
      }),
      [
         isTauri,
         isCapacitor,
         isMobile,
         showTitlebar,
         isProd,
         isDev,
         osInfo,
         setTitlebarButtons,
      ],
   );

   return (
      <>
         <EnvironmentContext.Provider value={contextValue}>
            {showTitlebar && (
               <>
                  <div
                     className="fixed top-0 right-0 w-full h-8 border-none z-layer-titlebar"
                     data-tauri-drag-region
                  >
                     <div className="text-normal">
                        <div className="absolute top-0 right-0 flex flex-row w-min">
                           {titlebarButtons.includes("minimize") && (
                              <TitlebarButton type="minimize" />
                           )}
                           {titlebarButtons.includes("maximize") && (
                              <TitlebarButton type="maximize" />
                           )}
                           {titlebarButtons.includes("close") && (
                              <TitlebarButton type="close" />
                           )}
                        </div>
                     </div>
                  </div>
               </>
            )}
            {children}
         </EnvironmentContext.Provider>
      </>
   );
};

export default EnvironmentProvider;
