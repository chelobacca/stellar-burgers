import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockBun, mockIngredient, mockStore } from '../src/services/mockData';
import { rootReducer, RootState } from '../src/services/store';
import {
  addIngredient,
  clearConstructorItems,
  clearOrderModalData,
  closeModal,
  openModal,
  removeIngredient
} from '../src/services/slices/burgerAppSlice';

describe('Синхронные экшены', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: mockStore
    });
  });

  it('должен добавлять ингредиент в состояние', () => {
    // store.dispatch(clearConstructorItems());
    store.dispatch(addIngredient(mockIngredient)); // Диспетчируем экшен
    store.dispatch(addIngredient(mockBun));

    // Получаем текущее состояние
    const state = store.getState() as RootState; // Явно указываем тип

    // console.log('state: '+ JSON.stringify(state.burger.constructorItems.bun));
    // console.log('mock: '+ JSON.stringify(mockBun));

    // Проверяем, что ингредиент добавлен
    expect(state.burger.constructorItems.ingredients).toContainEqual(
      mockIngredient
    );
    expect(state.burger.constructorItems.bun.name).toEqual(
      'Краторная булка N-200i'
    );
  });

  it('должен открывать модальное окно', () => {
    store.dispatch(openModal());
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.isModalOpened).toBe(true);
  });

  it('должен закрывать модальное окно', () => {
    store.dispatch(openModal());
    store.dispatch(closeModal());
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.isModalOpened).toBe(false);
  });

  it('должен очищать данные модального окна заказа', () => {
    store.dispatch(clearOrderModalData());
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.orderModalData).toBeNull();
  });

  it('должен очищать элементы конструктора', () => {
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(clearConstructorItems());
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.constructorItems.ingredients).toHaveLength(0);
    expect(state.burger.constructorItems.bun.price).toBe(0);
  });

  it('должен удалять ингредиент по id', () => {
    store.dispatch(removeIngredient(mockIngredient.id));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.constructorItems.ingredients).toHaveLength(2);
    expect(state.burger.constructorItems.ingredients).not.toContainEqual({ id: 'test_id_1' });
  });



  describe('moveUp', () => {
    it('should move ingredient up in the array', () => {
      const state = store.getState() as RootState; // Явно указываем тип


      const newState = reducer(initialState, moveUp({ index: 1 })); // Мясо (id: '2') должно переместиться вверх
      expect(newState.constructorItems.ingredients[0].id).toBe('2'); // Теперь на первом месте должно быть мясо
      expect(newState.constructorItems.ingredients[1].id).toBe('1'); // На втором месте должна остаться булка
    });

    it('should not change state if ingredient is already at the top', () => {
      const newState = reducer(initialState, moveUp({ index: 0 }));
      expect(newState).toEqual(initialState); // Состояние должно остаться прежним
    });
  });






  //
  //
  //
  //
  //
  //
  //
});
