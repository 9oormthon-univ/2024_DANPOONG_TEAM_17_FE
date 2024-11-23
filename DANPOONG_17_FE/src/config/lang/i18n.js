import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from "./translation.en";
import translationKo from "./translation.ko";

const resource = {
  en: {
    translation: translationEn,
  },
  ko: {
    translation: translationKo,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: resource,
  lng: "ko",
  fallbackLng: "ko",

  debug: true,
  detection: {
    // 감지 옵션
    order: ['localStorage', 'cookie', 'navigator'], // 언어 탐색 순서
    caches: ['localStorage', 'cookie'], // 언어를 저장할 위치
  },
  keySeparator: ".", // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;