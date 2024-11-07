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

export enum TitlebarButtonTypes {
   close = "close",
   minimize = "minimize",
   maximize = "maximize",
}
