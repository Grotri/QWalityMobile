import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationENG from "./locales/eng/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationRU from "./locales/ru/translation.json";

const fallbackLng = "ru";

const deviceLanguage: string =
  Localization.getLocales?.()[0]?.languageCode || fallbackLng;

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRU },
    eng: { translation: translationENG },
    fr: { translation: translationFR },
  },
  lng: deviceLanguage,
  fallbackLng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
