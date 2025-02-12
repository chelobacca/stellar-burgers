import { expect, test, describe, jest } from '@jest/globals';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { getIsAuthChecked } from '../src/services/auth/slice';
import { selectLoading, selectOrderModalData } from '../src/services/slices/burgerAppSlice';
import { mockStore } from '../src/services/mockData';
import { rootReducer } from '../src/services/store'


const store = configureStore({
  reducer: rootReducer,
  preloadedState: mockStore
});

describe('Test selectors', () => {
  
  test('Test selectLoading', () => {
    const loading = selectLoading(store.getState());
    expect(loading).toBe(false);
  });

  test('Test isAuthChecked', () => {
    const isAuthChecked = getIsAuthChecked(store.getState());
    expect(isAuthChecked).toBe(false);
  });

  




  test('Test selectOrderModalData', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual(mockStore.burger.orderModalData);
  });

  
});
