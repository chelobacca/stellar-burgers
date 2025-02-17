import { expect, test, describe, jest } from '@jest/globals';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { getIsAuthChecked, getUser } from '../src/services/auth/slice';
import {
  getFeedSelector,
  getIngredients,
  getUserOrders,
  modalSelector,
  orderRequestSelector,
  selectConstructorItems,
  selectLoading,
  selectOrderModalData
} from '../src/services/slices/burgerAppSlice';
import { mockStore } from '../src/services/mockData';
import { rootReducer } from '../src/services/store';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: mockStore
});

describe('Test selectors', () => {
  test('получаем selectLoading', () => {
    const loading = selectLoading(store.getState());
    expect(loading).toBe(false);
  });

  test('получаем isAuthChecked', () => {
    const isAuthChecked = getIsAuthChecked(store.getState());
    expect(isAuthChecked).toBe(false);
  });

  test('получаем  данные пользователя', () => {
    const userData = getUser(store.getState());
    expect(userData).toEqual(mockStore.auth.user);
  }); 

  test('получаем список ингредиентов', () => {
    const ingredients = getIngredients(store.getState());
    expect(ingredients).toEqual(mockStore.burger.ingredients);
  });

  test('получаем ленту заказов', () => {
    const feed = getFeedSelector(store.getState());
    expect(feed).toEqual(mockStore.burger.feed);
  });

  test('получаем состояние модального окна', () => {
    const isModalOpened = modalSelector(store.getState());
    expect(isModalOpened).toBe(false);
  });

  test('получаем конструктор', () => {
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(mockStore.burger.constructorItems);
  });

  test('получаем orderRequest', () => {
    const orderRequest = orderRequestSelector(store.getState());
    expect(orderRequest).toBe(false);
  });

  test('получаем содержимое окна заказа', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual(mockStore.burger.orderModalData);
  });

  test('получаем заказы пользователя', () => {
    const userOrders = getUserOrders(store.getState());
    expect(userOrders).toEqual(mockStore.burger.userOrders);
  });

});

