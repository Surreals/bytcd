import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    debug: true, // Enable debug mode for development
    fallbackLng: 'en', // Fallback language if detection fails or translation is missing
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    resources: {
      // Translations will be loaded from public/locales/{{lng}}/translation.json
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;