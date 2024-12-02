import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from "../assets/locales/en.json";
import noJSON from "../assets/locales/no.json";

i18n.use(initReactI18next).init({
   resources: {
      en: { ...enJSON },
      no: { ...noJSON },
   },
   lng: "en",
   fallbackLng: "en",
});

export default i18n;
