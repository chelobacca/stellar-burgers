import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, setUser } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

//type ConstrIngre = Ingredient & { key: string};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
    // addIngredient: {
    //     reducer: (state, action) => {
    //         state.ingredients.push(action.payload);
    //     },
    //     prepare: (ingredient) => {
    //         return { payload: {...ingredient, key: nanoid()}}
    //     }
    // }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { setIsAuthChecked } = authSlice.actions;
export const { getIsAuthChecked, getUser } = authSlice.selectors;
