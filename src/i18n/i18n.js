import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    ns: ['spotifiuby'],
    defaultNS: 'spotifiuby',

    debug: true,

    resources: {
      en,
      es,
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
