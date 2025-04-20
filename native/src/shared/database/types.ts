// import type {User as SupabaseUser} from "@supabase/supabase-js";

import { Provider } from "@supabase/supabase-js";

type DateOfBirth = `${number}-${number}-${number}`;
type Timestamp = string;

enum Gender {
	male = "male",
	female = "female",
	nonBinary = "nonBinary",
	other = "other",
	preferNotToSay = "preferNotToSay",
}

type GenderType = keyof typeof Gender;

enum Theme {
	light = "light",
	dark = "dark",
	system = "system",
	custom = "custom",
}

type ThemeType = keyof typeof Theme;

interface Metadata {
	[key: string]: any;
}

interface UserMetadata extends Metadata {
	language: string; // defaults to "en" / this decides what i18next uses.
	notificationsEnabled?: boolean; // defaults to true, can be turned off.
	appPrimaryColor?: string; // dark
	appAccentColor?: string; // purple
}

interface UserReadingPrefsMetadata extends Metadata {
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
interface UserReadingPrefs {
	userId: string;
	prefs: UserReadingPrefsMetadata;
}

// inferred off of supabase session and user off of login.
interface AuthUser {
	userId: string; // auth.user.id
	email: string | null;
	provider?: Provider; // default is email;
	accessToken?: string;
	refreshToken?: string;
}

// gets populated on auth login and fetching settings and readingprefs thereafter.
interface User {
	auth: AuthUser;
	profile: UserProfile;
	settings?: UserSettings;
	readingPrefs?: UserReadingPrefs;
}

// user settings table.
interface UserSettings {
	userId: string; // auth.user.id
	metadata: UserMetadata;
	theme: ThemeType; // defaults to dark, can be switched.

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// user profile.
interface UserProfile {
	userId: string; // auth.user.id
	gender?: GenderType;
	dob?: DateOfBirth;
	avatarUrl?: string; // generated / uploaded

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// synced table
interface PremiumSubscription {
	userId: string;
	startDate: string;
	endDate: string;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

type LibraryType = "local" | "synced";

// synced
interface Library {
	id: string;
	userId: string;
	name: string;
	description?: string;
	coverUrl?: string;
	type: LibraryType;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// important for how the parser parses the content
// and the structure of the content in appdata/books/{bookId}/
type BookFormats = "epub" | "webnovel" | "lightnovel" | "pdf" | "txt" | "Kindle";

type BookStatus = "ongoing" | "completed" | "hiatus";

// synced if the library id join library.type is sync.
interface Book {
	id: string;
	libraryId: string;
	userId: string;
	title: string;
	coverImageUrl?: string;
	fileUrl?: string; // path to file in /books/{bookId}/source.epub;
	format: BookFormats | string;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// synced if book is synced, same business.
interface BookInfo {
	id: string;
	bookId: string;
	parsingVersion: number; // if the parsing version is different, trigger a reparsing.
	metadata: BookMetadata;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

interface BookMetadata extends Metadata {
	bookId: string;
	author?: string;
	artist?: string;
	summary?: string;
	status?: BookStatus | string;
	language?: string;
	genres?: string[];
	tags?: string[];
	wordCount?: number;
	pageCount?: number;
	externalId?: string; // royalroadId/gutenbergId
	source?: string; // "RoyalRoad", "Gutenberg"
	spine?: string[]; // from epub structure
	metadataVersion?: number;

	updatedAt: Timestamp;
}

interface Chapter {
	id: string;
	bookId: string;
	index: number; // reading order (0 based)
	resourceUrl?: string; // maps to /$appdata/books/{bookId}/resources/{resourceId}/parsed.{ext};
	sourceHref?: string; // if you imported/saved a novel from project gutenberg or royalroad.
	title?: string;
	snippet?: string; // used for readingNow in /home.
	wordCount?: number; // optional word count.
	estimatedReadingTime?: number; // estimated reading time.
	isRead?: boolean;
	isDownloaded?: boolean;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}
