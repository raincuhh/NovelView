// export enum OnboardingViews {
// 	welcome = "welcome",
// 	registerOnboardingFlow = "registerOnboardingFlow",
// 	loginOnboardingFlow = "loginOnboardingFlow",
// }

// export enum OnboardingLoginViews {
// 	loginOptions = "loginOptions",
// 	loginForm = "loginForm",
// 	resetPasswordForm = "resetPasswordForm",
// 	forgotPasswordForm = "forgotPasswordForm",
// 	verifyEmailForm = "verifyEmailForm",
// }

// export enum OnboardingRegisterViews {
// 	registerOptions = "registerOptions",
// 	registerEmailForm = "registerEmailForm",
// 	registerPasswordForm = "registerPasswordForm",
// 	registerGenderForm = "registerGenderForm",
// 	registerDOBForm = "registerDOBForm",
// 	registerUsernameForm = "registerUsernameForm",
// 	registerFinish = "registerFinish",
// }

export enum CombinedOnboardingViews {
	//toplevel flow.
	welcome = "welcome",
	loginOptions = "loginOptions",
	registerOptions = "registerOptions",

	//login flow
	loginForm = "loginForm",
	resetPasswordForm = "resetPasswordForm",
	forgotPasswordForm = "forgotPasswordForm",
	verifyEmailForm = "verifyEmailForm",

	//register flow
	registerEmailForm = "registerEmailForm",
	registerPasswordForm = "registerPasswordForm",
	registerGenderForm = "registerGenderForm",
	registerDOBForm = "registerDOBForm",
	registerUsernameForm = "registerUsernameForm",
	registerFinish = "registerFinish",
}
