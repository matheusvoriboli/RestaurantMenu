import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/enUs/translations.json';
import ptBRTranslations from '../locales/ptBr/translations.json';

i18n.use(initReactI18next).init({
  resources: {
    "en-US": {
      translation: enTranslations,
    },
    "pt-BR": {
      translation: ptBRTranslations,
    },
  },
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;