import { PropsWithChildren, useEffect, useState, useMemo, useCallback } from "react";
import { EnvironmentContext } from "../../shared/lib/hooks";
import MobileDetect from "mobile-detect";

import TitleBar from "../../shared/components/ui/title_bar";
import { TitleBarButtonState } from "../../shared/lib/types";
import { isTauri } from "../../shared/lib/tauri_utils";

type EnvironmentProviderProps = PropsWithChildren;

export default function EnvironmentProvider({ children }: EnvironmentProviderProps): JSX.Element {
   const mobileDetect: MobileDetect = new MobileDetect(window.navigator.userAgent);
   const isMobile = useMemo(() => mobileDetect.mobile() !== null || mobileDetect.tablet() !== null, []);
   const isDesktop = !isMobile;

   const [titleBarCloseButton, setTitleBarCloseButton] = useState<boolean>(true);

   const [titleBarMaximizeButton, setTitleBarMaximizeButton] = useState<boolean>(true);

   const [titleBarMinimizeButton, setTitleBarMinimizeButton] = useState<boolean>(true);

   const updateTitleBarButtons = useCallback((buttons: TitleBarButtonState) => {
      if (buttons.closeButton !== undefined) setTitleBarCloseButton(buttons.closeButton);
      if (buttons.maximizeButton !== undefined) setTitleBarMaximizeButton(buttons.maximizeButton);
      if (buttons.minimizeButton !== undefined) setTitleBarMinimizeButton(buttons.minimizeButton);
   }, []);

   const contextValue = useMemo(
      () => ({
         isDesktop,
         isMobile,
         updateTitleBarButtons,
      }),
      [isDesktop, isMobile, updateTitleBarButtons]
   );

   return (
      <EnvironmentContext.Provider value={contextValue}>
         {isDesktop && isTauri && (
            <TitleBar
               closeButton={titleBarCloseButton}
               maximizeButton={titleBarMaximizeButton}
               minimizeButton={titleBarMinimizeButton}
            />
         )}
         {children}
      </EnvironmentContext.Provider>
   );
}
