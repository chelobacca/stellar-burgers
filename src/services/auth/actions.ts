import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setIsAuthChecked } from './slice';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie } from '../../utils/cookie';

export const login = createAsyncThunk<TUser, TLoginData>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => logoutApi());

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const setUser = createAction<TUser, 'auth/setUser'>('auth/setUser'); ///

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
