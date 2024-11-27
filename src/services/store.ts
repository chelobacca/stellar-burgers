import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authSlice } from './auth/slice';
import { burgerApp } from './slices/burgerAppSlice';

export const rootReducer = combineSlices(authSlice, burgerApp);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

// получаем состояние хранилища при любых изменениях
// store.subscribe(() => {
//   console.log('Current state:', store.getState());
// });
