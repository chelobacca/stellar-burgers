import thunk from 'redux-thunk';
import {
  login,
  logout,
  register,
  checkUserAuth,
  setUser
} from '../src/services/auth/actions';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from '../src/services/store';
import { mockStore, orderMockData } from '../src/services/mockData';
import {
  fetchFeed,
  fetchIngredients,
  fetchOrder,
  fetchUserOrders,
  postNewOrder
} from '../src/services/slices/burgerAppSlice';
import { TOrder } from '../src/utils/types';
import { getOrderByNumberApi } from '../src/utils/burger-api';

describe('burgerAppSlice async actions', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: mockStore
    });
  });

  // INGREDIENTS //

  it('should handle fetchIngredients.pending', async () => {
    await store.dispatch(fetchIngredients.pending('pending'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', async () => {
    const state = store.getState() as RootState; // Явно указываем тип
    const mockIngredients = state.burger.ingredients;
    await store.dispatch(
      fetchIngredients.fulfilled(mockIngredients, 'fulfilled')
    );
    expect(state.burger.loading).toBe(false);
    expect(state.burger.ingredients).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = store.getState() as RootState; // Явно указываем тип
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(fetchIngredients.rejected(mockAnswer, 'rejected'));
    expect(state.burger.loading).toBe(false);
  });

  // NEW ORDER //

  it('should handle postNewOrder.pending', async () => {
    await store.dispatch(
      postNewOrder.pending('pending', orderMockData.ingredients)
    );
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.orderRequest).toBe(true);
  });

  it('should handle postNewOrder.fulfilled', async () => {
    const mockResponse = {
      success: true,
      name: 'testname',
      order: {
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
    await store.dispatch(
      postNewOrder.fulfilled(
        mockResponse,
        'fulfilled',
        orderMockData.ingredients
      )
    );
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.orderModalData).toEqual(orderMockData);
    expect(state.burger.orderRequest).toBe(false);
  });

  it('should handle postNewOrder.rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(postNewOrder.rejected(mockAnswer, 'rejected', ['']));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(false);
  });

  // FEED //

  it('should handle fetchFeed.pending', async () => {
    await store.dispatch(fetchFeed.pending('pending'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(true);
  });

  it('should handle fetchFeed fulfilled', async () => {
    const mockResponse = {
      success: true,
      total: 100,
      totalToday: 10,
      orders: [
        {
          _id: '664e927097ede0001d06bdb9',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-05-23T00:48:48.039Z',
          updatedAt: '2024-05-23T00:48:48.410Z',
          number: 40680
        }
      ]
    };

    await store.dispatch(fetchFeed.fulfilled(mockResponse, 'fulfilled'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(false);
    expect(state.burger.feed.orders).toEqual(mockResponse.orders);
  });

  it('should handle fetchFeed.rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(fetchFeed.rejected(mockAnswer, 'rejected'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(false);
  });

  // USER ORDERS //

  it('should handle fetchUserOrders.pending', async () => {
    await store.dispatch(fetchUserOrders.pending('pending'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(true);
  });

  it('should handle fetchUserOrders.fulfilled', async () => {
    const mockResponse = [
      {
        _id: '664e927097ede0001d06bdb9',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-05-23T00:48:48.039Z',
        updatedAt: '2024-05-23T00:48:48.410Z',
        number: 40680
      }
    ];

    await store.dispatch(fetchUserOrders.fulfilled(mockResponse, 'fulfilled'));
    const state = store.getState() as RootState; // Явно указываем тип

    expect(state.burger.loading).toBe(false);
    expect(state.burger.userOrders).toEqual(mockResponse);
  });

  it('should handle fetchUserOrders.rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(fetchUserOrders.rejected(mockAnswer, 'rejected'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(false);
  });

  // ORDER BY NUMBER //

  it('should handle fetchOrder.pending', async () => {
    await store.dispatch(fetchOrder.pending('', 123, 'pending'));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(true);
  });

  it('should handle fetchOrder.fulfilled', async () => {
    const mockResponse: TOrder = {
      _id: '664e927097ede0001d06bdb9',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-23T00:48:48.039Z',
      updatedAt: '2024-05-23T00:48:48.410Z',
      number: 40680
    };

    await store.dispatch(
      fetchOrder.fulfilled(mockResponse, 'fulfilled', 40680)
    );
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(false);
    expect(state.burger.orderModalData).toEqual(mockResponse);
  });

  it('should handle fetchOrder.rejected', () => {
    const mockAnswer = { name: 'test', message: 'error' };
    store.dispatch(fetchOrder.rejected(mockAnswer, 'rejected', 40680));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.loading).toBe(false);
  });





  
});
