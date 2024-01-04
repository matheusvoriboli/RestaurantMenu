import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import checkoutReducer from './features/checkout-slice';
import menuReducer from './features/menu-slice';
import restaurantReducer from './features/restaurant-slice';

export const store = configureStore({
   reducer: {
      restaurant: restaurantReducer,
      menu: menuReducer,
      checkout: checkoutReducer,
   }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;