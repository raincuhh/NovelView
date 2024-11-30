export type AuthActions =
   | "register"
   | "login"
   | "forgotPassword"
   | "forgotEmail"
   | "resetPassword"
   | "verifyEmail";

export type AuthField =
   | "username"
   | "email"
   | "password"
   | "confirmPassword"
   | "verificationCode";
