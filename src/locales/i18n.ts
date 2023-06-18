import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-http-backend';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en/translation.json';
import pl from '@/locales/pl/translation.json';

i18n
  .use(XHR)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
    supportedLngs: ['pl', 'en'],
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
    //debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
