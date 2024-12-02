export enum LandingPageViews {
   home = "home",
   login = "login",
   register = "register",
   createLibrary = "createLibrary",
}

export type LandingPageType = {
   [K in keyof typeof LandingPageViews]: (typeof LandingPageViews)[K];
};
