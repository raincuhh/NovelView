import {
   PropsWithChildren,
   useEffect,
   useState,
   useMemo,
   useCallback,
} from "react";
import { EnvironmentContext } from "../../shared/lib/hooks";
import MobileDetect from "mobile-detect";

import TitleBar from "../../shared/components/ui/title_bar";
import { TitleBarButtonState } from "../../shared/lib/types";
import { is_tauri } from "../../shared/lib/tauri_utils";

type EnvironmentProviderProps = PropsWithChildren;

export default function EnvironmentProvider({
   children,
}: EnvironmentProviderProps): JSX.Element {
   const mobile_detect: MobileDetect = new MobileDetect(
      window.navigator.userAgent
   );
   const is_mobile = useMemo(
      () =>
         mobile_detect.mobile() !== null ||
         mobile_detect.tablet() !== null,
      []
   );
   const is_desktop = !is_mobile;

   const [
      titlebar_close_button,
      set_titlebar_close_button,
   ] = useState(true);
   const [
      titlebar_maximize_button,
      set_titlebar_maximize_button,
   ] = useState(true);
   const [
      titlebar_minimize_button,
      set_titlebar_minimize_button,
   ] = useState(true);

   const update_titlebar_buttons = useCallback(
      (buttons: TitleBarButtonState) => {
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
         update_titlebar_buttons,
      }),
      [is_desktop, is_mobile, update_titlebar_buttons]
   );

   return (
      <EnvironmentContext.Provider value={context_value}>
         {is_desktop && is_tauri && (
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
