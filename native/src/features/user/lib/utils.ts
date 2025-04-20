import { UserReadingPrefsMetadata } from "@/features/user/types";

export function getDefaultUserReadingPrefs(): UserReadingPrefsMetadata {
	return {
		fontSize: 14, // Default font size in px
		paragraphGap: 12, // Default paragraph gap in px
		lineHeight: 1.6, // Default line height
		fontFamily: "default", // Default font family
		fontWeight: 400, // Default font weight (normal)
		letterSpacing: 0, // Default letter spacing
		horizontalPadding: 16, // Default horizontal padding in px
		backgroundColor: "", // Default background color (light theme)
		textColor: 0, // Default text color
		showDropCaps: true, // Default show drop caps
		showPageNumber: true, // Default show page number
		scrollMode: "paged", // Default scroll mode (paged or continuous)
		textAlignment: "left", // Default text alignment
		pageTransition: "slide", // Default page transition (slide or fade or none)
		nightMode: false, // Default night mode off
		dimBrightness: false, // Default dim brightness off
		fullScreen: false, // Default fullscreen off
		displayProgress: true, // Default display progress on
		enableTTS: false, // Default TTS off
	};
}
