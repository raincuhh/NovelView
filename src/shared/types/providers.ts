import { TitleBarButtonState } from "../lib/types";

export type EnvironmentContextProps = {
   is_mobile: boolean;
   is_desktop: boolean;
   is_tauri?: boolean;
   is_capacitor?: boolean;
   update_titlebar_buttons: (
      buttons: TitleBarButtonState
   ) => void;
};
