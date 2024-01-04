import enTranslations from '@/locales/enUs/translations.json';
import ptBRTranslations from '@/locales/ptBr/translations.json';
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import i18n from 'i18next';
import { ReactElement } from "react";
import { initReactI18next } from 'react-i18next';
import { Provider } from "react-redux";
import { mockCheckoutData } from "../mocks/mockCheckoutData";
import { mockRestaurantData } from "../mocks/mockRestaurantData";

type RenderOptions = {
  initialState?: any;
  renderOptions?: any;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": {
        translation: enTranslations,
      },
      "pt-BR": {
        translation: ptBRTranslations,
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default function render(
  ui: ReactElement,
  { initialState, ...renderOptions }: RenderOptions = {}
) {
  const store = configureStore({
    reducer: () => ({
      restaurant: {
        value: initialState || mockRestaurantData,
      },
      checkout: {
        value: initialState || mockCheckoutData,
      },
      modal: {
        value: initialState || false,
      },
    }),
  });

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}