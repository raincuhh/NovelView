//
export enum UserRoles {
   admin = "admin",
   user = "user",
   guest = "guest",
}

export type User = {};

export enum RouteTypes {
   public,
   protected, // needs to be authenticated
   auth, // redirects if authenticated
   admin, // needs userrole to be admin
}

export enum TitleBarButtonTypes {
   close = "close",
   minimize = "minimize",
   maximize = "maximize",
}

export type TitleBarButtonState = {
   closeButton?: boolean;
   maximizeButton?: boolean;
   minimizeButton?: boolean;
};
