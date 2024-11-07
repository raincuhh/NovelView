//
export enum UserRoles {
   admin = "admin",
   user = "user",
   guest = "guest",
}

export type User = {};

export type EnvironmentContextProps = {
   is_mobile: boolean;
   is_desktop: boolean;
   is_tauri?: boolean;
   is_capacitor?: boolean;
};

export enum TitleBarButtonTypes {
   close = "close",
   minimize = "minimize",
   maximize = "maximize",
}

export type TitleBarButtonState = {
   close_button?: boolean;
   maximize_button?: boolean;
   minimize_button?: boolean;
};
