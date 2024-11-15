import { TitleBarButtonState } from "../lib/types";

export type EnvironmentContextProps = {
   isMobile: boolean;
   isDesktop: boolean;
   isTauri?: boolean;
   isCapacitor?: boolean;
   updateTitleBarButtons: (buttons: TitleBarButtonState) => void;
};
