import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { api } from '../../utils/api';
import { setIsAuthChecked } from './slice';

export const login = createAsyncThunk('auth/login', async () => api.login());

export const logout = createAsyncThunk('auth/logout', async () => api.logout());

export const setUser = createAction<TUser | null, 'auth/setUser'>(
  'auth/setUser'
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      api
        .getUser()
        .then((user) => dispatch(setUser(user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
