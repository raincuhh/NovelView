export enum LandingPageViews {
   home = "home",
   login = "login",
   register = "register",
}

export type LandingPageType = {
   [K in keyof typeof LandingPageViews]: (typeof LandingPageViews)[K];
};
