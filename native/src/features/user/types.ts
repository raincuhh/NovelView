import { Metadata, ThemeType, Timestamp } from "@/shared/database/types";
import { DateOfBirth, GenderType } from "@/shared/lib/types";
import { Provider } from "@supabase/supabase-js";

export interface UserMetadata extends Metadata {
	language: string; // defaults to "en" / this decides what i18next uses.
	notificationsEnabled?: boolean; // defaults to true, can be turned off.
	appPrimaryColor?: string; // dark
	appAccentColor?: string; // purple
}

export interface UserReadingPrefsMetadata extends Metadata {
	fontSize?: number; // 14px default, measures in px
	paragraphGap?: number; // 12px pb-[paragraphGap] in code
	lineHeight?: number; // 1.6
	fontFamily?: string; // serif, sans, monospace, dyslexic, default, lora, roboto etc. // might add importing in future.
	fontWeight?: number; // 400 (regular), 700 (bold), etc...

	letterSpacing?: number; // default, example 0.5 for airy spacing, etc.
	horizontalPadding?: number; // px, defaults to 16px;
	backgroundColor?: string; // hex or rgb;
	textColor?: number; // text color.
	showDropCaps?: boolean; // stylized (big) first letter cap.
	showPageNumber?: boolean; // page indicator toggle.

	scrollMode?: "paged" | "continuous"; // infinite scroll / pagination
	textAlignment?: "left" | "justify" | "center";
	pageTransition?: "slide" | "fade" | "none";

	nightMode?: boolean; // override app theme even if system or custom.
	dimBrightness?: boolean; // softens white point for night time (mostly for if your reading on lightmode)
	fullScreen?: boolean; // fullscreen, hides all other things except your reader view;

	displayProgress?: boolean; // display a percentage or (chapters read / chapters to read) in reader mode.
	enableTTS?: boolean; // text to speech. planned.
}

// user reading prefs table
export interface UserReadingPrefs {
	id: string;
	prefs: UserReadingPrefsMetadata;
}

// inferred off of supabase session and user off of login.
export interface AuthUser {
	id: string; // auth.user.id
	email?: string;
	provider?: Provider; // default is email;
	accessToken?: string;
	refreshToken?: string;
}

// gets populated on auth login and fetching settings and readingprefs thereafter.
export interface User {
	auth: AuthUser;
	profile: UserProfile;
	settings?: UserSettings;
	readingPrefs?: UserReadingPrefs;
}

// user settings table.
export interface UserSettings {
	id: string; // auth.user.id
	metadata: UserMetadata;
	theme: ThemeType; // defaults to dark, can be switched.

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// user profile.
export interface UserProfile {
	id: string; // auth.user.id
	username: string;
	gender?: GenderType;
	dob?: DateOfBirth;
	avatarUrl?: string; // generated / uploaded

	createdAt: Timestamp;
	updatedAt: Timestamp;
}
