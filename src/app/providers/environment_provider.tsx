import { PropsWithChildren, useEffect, useState, useMemo } from "react";
import { EnvironmentContext } from "../../shared/lib/hooks";
import MobileDetect from "mobile-detect";

type EnvironmentProviderProps = PropsWithChildren;

export default function EnvironmentProvider({
   children,
}: EnvironmentProviderProps): JSX.Element {
   const [is_desktop, set_is_desktop] = useState(false);
   const [is_mobile, set_is_mobile] = useState(false);
   const [is_tauri, set_is_tauri] = useState(false);

   useEffect(() => {
      const mobile_detect: MobileDetect = new MobileDetect(
         window.navigator.userAgent
      );
      const is_mobile_device =
         mobile_detect.mobile() !== null || mobile_detect.tablet() !== null;

      set_is_mobile(is_mobile_device);
      set_is_desktop(!is_mobile_device);

      const is_tauri_app =
         process.env.NODE_ENV === "production" && "__TAURI__" in window;
      set_is_tauri(is_tauri_app);

      //console.log("is tauri app: ", is_tauri_app);
      //console.log("is desktop: ", is_desktop);
      //console.log("is mobile", is_mobile);
   }, []);

   const context_value = useMemo(
      () => ({
         is_desktop,
         is_mobile,
         is_tauri,
      }),
      [is_desktop, is_mobile, is_tauri]
   );

   return (
      <EnvironmentContext.Provider value={context_value}>
         {children}
      </EnvironmentContext.Provider>
   );
}