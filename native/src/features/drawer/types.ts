export const drawerIDs = ["profile"] as const;

export type DrawerID = string | (typeof drawerIDs)[number];
