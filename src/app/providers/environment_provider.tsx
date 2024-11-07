import {
   PropsWithChildren,
   useEffect,
   useState,
   useMemo,
   useCallback,
} from "react";
import { EnvironmentContext } from "../../shared/lib/hooks";
import MobileDetect from "mobile-detect";

import TitleBar from "../../shared/components/titlebar";
import { TitlebarButtonTypes } from "../../shared/lib/types";

type EnvironmentProviderProps = PropsWithChildren;

export default function EnvironmentProvider({
   children,
}: EnvironmentProviderProps): JSX.Element {
   const [is_desktop, set_is_desktop] = useState(false);
   const [is_mobile, set_is_mobile] = useState(false);
   const [is_tauri, set_is_tauri] = useState(false);

   const [
      titlebar_close_button,
      set_titlebar_close_button,
   ] = useState(true);
   const [
      titlebar_maximize_button,
      set_titlebar_maximize_button,
   ] = useState(false);
   const [
      titlebar_minimize_button,
      set_titlebar_minimize_button,
   ] = useState(true);

   useEffect(() => {
      const mobile_detect: MobileDetect = new MobileDetect(
         window.navigator.userAgent
      );
      const is_mobile_device =
         mobile_detect.mobile() !== null ||
         mobile_detect.tablet() !== null;

      set_is_mobile(is_mobile_device);
      set_is_desktop(!is_mobile_device);

      const is_tauri_app =
         process.env.NODE_ENV === "production" &&
         "__TAURI__" in window;
      set_is_tauri(is_tauri_app);

      //console.log("is tauri app: ", is_tauri_app);
      //console.log("is desktop: ", is_desktop);
      //console.log("is mobile", is_mobile);
   }, []);

   type UpdateTitlebarButtons = {
      close_button?: boolean;
      maximize_button?: boolean;
      minimize_button?: boolean;
   };

   const update_titlebar_buttons = useCallback(
      (buttons: UpdateTitlebarButtons) => {
         if (buttons.close_button !== undefined)
            set_titlebar_close_button(buttons.close_button);
         if (buttons.maximize_button !== undefined)
            set_titlebar_maximize_button(
               buttons.maximize_button
            );
         if (buttons.minimize_button !== undefined)
            set_titlebar_minimize_button(
               buttons.minimize_button
            );
      },
      []
   );

   const context_value = useMemo(
      () => ({
         is_desktop,
         is_mobile,
         is_tauri,
         update_titlebar_buttons,
      }),
      [
         is_desktop,
         is_mobile,
         is_tauri,
         update_titlebar_buttons,
      ]
   );
   //titlebar beside {children}
   return (
      <EnvironmentContext.Provider value={context_value}>
         {is_desktop && !is_mobile && (
            <TitleBar
               close_button={titlebar_close_button}
               maximize_button={titlebar_maximize_button}
               minimize_button={titlebar_minimize_button}
            />
         )}
         {children}
      </EnvironmentContext.Provider>
   );
}
