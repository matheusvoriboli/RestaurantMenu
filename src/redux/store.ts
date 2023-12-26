import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import menuReducer from './features/menu-slice';
import orderReducer from './features/order-slice';
import resturantReducer from './features/restaurant-slice';

export const store = configureStore({
   reducer: {
      restaurant: resturantReducer,
      menu: menuReducer,
      order: orderReducer
   }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;