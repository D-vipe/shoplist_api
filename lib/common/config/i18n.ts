import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['ru', 'en'], // Add supported languages here
    backend: {
      loadPath: path.join(__dirname, '../../locales/{{lng}}/translation.json'),
    },
    detection: {
      order: ['header', 'querystring',], // Detect language from query param or headers
      lookupQuerystring: 'lang',
      lookupHeader: 'accept-language', // Query parameter to detect language
    },
  });

export default i18next;
