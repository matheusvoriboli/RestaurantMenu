import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from 'react-redux';
import { mockCheckoutData } from "../mocks/mockCheckoutData";
import { mockRestaurantData } from "../mocks/mockRestaurantData";

type RenderOptions = {
   initialState?: any;
   renderOptions?: any;
 }

export default function render(ui: ReactElement, { initialState, ...renderOptions }: RenderOptions = {}) {
   const store = configureStore({
     reducer: () => ({
       restaurant: {
         value: initialState || mockRestaurantData,
       },
       checkout: {
          value: initialState || mockCheckoutData,
       }
     }),
   });
   function Wrapper({ children }: { children?: React.ReactNode }) {
      return <Provider store={store}>{children}</Provider>;
  }
   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
 }