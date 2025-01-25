import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, setUser } from './actions';
import { TRegisterData, updateUserApi } from '../../utils/burger-api';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  loading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    selectLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })

      //обновить данные пользователя
      .addCase(patchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchUpdateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(patchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && state.user !== null) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      });
  }
});

export const patchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const { setIsAuthChecked } = authSlice.actions;
export const { getIsAuthChecked, getUser, selectLoading } = authSlice.selectors;
