import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// @ts-ignore
import HttpApi from "i18next-http-backend";
import Backend from "i18next-fs-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	.use(initReactI18next)
	.use(Backend)
	// .use(HttpApi)
	.use(LanguageDetector)
	.init({
		fallbackLng: "en",
		debug: true,
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},

		backend: {
			loadPath: "locales/{{lng}}/translate.json",
		},
		detection: {
			order: ["querystring", "cookie", "localStorage", "navigator"],
			caches: ["localStorage", "cookie"],
		},
	});

i18n.on("languageChanged", (lng) => {
	console.log("Language changed to", lng);
});

export default i18n;
