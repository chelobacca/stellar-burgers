import { expect, test, describe } from '@jest/globals';
import {
  configureStore,
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction
} from '@reduxjs/toolkit';
import { mockIngredient, mockStore } from '../src/services/mockData';
import { rootReducer } from '../src/services/store';
import {
  addIngredient,
  TInitialState
} from '../src/services/slices/burgerAppSlice';
import { TUserState } from '../src/services/auth/slice';

describe('Синхронные экшены', () => {
  let store;

  beforeEach(() => {
    // Инициализируем новый стор перед каждым тестом
    store = configureStore({
      reducer: rootReducer,
      preloadedState: mockStore
    });
  });

  it('должен добавлять ингредиент в состояние', () => {

    // Диспетчируем экшен
    store.dispatch(addIngredient(mockIngredient));

    // Получаем текущее состояние
    const state = store.getState();

    // Проверяем, что ингредиент добавлен
    expect(state.burger.constructorItems.ingredients).toContainEqual(
      mockIngredient
    );
  });
});
