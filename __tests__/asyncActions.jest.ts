import thunk from 'redux-thunk';
import {
  login,
  logout,
  register,
  checkUserAuth,
  setUser
} from '../src/services/auth/actions';
import { setIsAuthChecked } from '../src/services/auth/slice';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '../src/utils/burger-api';
import { TUser } from '../src/utils/types';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from '../src/services/store';
import { mockStore, orderMockData } from '../src/services/mockData';
import { fetchIngredients, postNewOrder } from '../src/services/slices/burgerAppSlice';

describe('burgerAppSlice async actions', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: mockStore
    });
  });

  it('should handle fetchIngredients.pending', async () => {
    await store.dispatch(fetchIngredients.pending('pending'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', async () => {
    const state = store.getState() as RootState; // Явно указываем тип
    const mockIngredients = state.burger.ingredients
    await store.dispatch(fetchIngredients.fulfilled(mockIngredients, 'fulfilled'));
    expect(state.burger.loading).toBe(false);
    expect(state.burger.ingredients).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = store.getState() as RootState; // Явно указываем тип
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(fetchIngredients.rejected(mockAnswer, 'rejected'));
    expect(state.burger.loading).toBe(false);
  });

  it('should handle postNewOrder.pending', async () => {
    await store.dispatch(postNewOrder.pending('pending', orderMockData.ingredients));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.orderRequest).toBe(true);
  });

  it('should handle postNewOrder.fulfilled', async () => {
    const mockResponse = {
      success: true,
      name: 'testname',
      order:   {
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        _id: '6622337897ede0001d0666b5',
        status: 'done',
        name: 'testName',
        createdAt: '2024-04-19T09:03:52.748Z',
        updatedAt: '2024-04-19T09:03:58.057Z',
        number: 123
      }
    };
    await store.dispatch(postNewOrder.fulfilled(mockResponse, 'fulfilled', orderMockData.ingredients));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.orderModalData).toEqual(orderMockData);
    expect(state.burger.orderRequest).toBe(false);
  });

  it('should handle postNewOrder.rejected', () => {
    const state = store.getState() as RootState; // Явно указываем тип
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(postNewOrder.rejected(mockAnswer, 'rejected', ['']));
    expect(state.burger.loading).toBe(false);
  });




});
