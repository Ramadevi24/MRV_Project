// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpApi from 'i18next-http-backend';

// i18n
// .use(HttpApi)
// .use(LanguageDetector)
// .use(initReactI18next)
// .init({
//   fallbackLng: 'en',
//   debug: true,
//   interpolation: {
//     escapeValue: false,
//   },
//   backend: {
//     loadPath: '/locales/{{lng}}/translation.json'
//   }
// });


// export default i18n;


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

// i18n
//   .use(Backend) // Load translations using HTTP (backend)
//   .use(LanguageDetector) // Detect user language
//   .use(initReactI18next) // Passes i18n down to react-i18next
//   .init({
//     fallbackLng: 'en', // Default language
//     debug: true, // Set to false in production
//     interpolation: {
//       escapeValue: false, // React already escapes by default
//     },
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
//     }
//   });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
 import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true, // You might want to disable this in production
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // Disable caching in i18next
      queryStringParams: { v: new Date().getTime() } // Appends timestamp to bypass cache
    },
    interpolation: {
      escapeValue: false,
    },
  });
  export default i18n;

