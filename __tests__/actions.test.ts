import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockBun, mockIngredient, mockStore } from '../src/services/mockData';
import { rootReducer, RootState } from '../src/services/store';
import {
  addIngredient,
  clearConstructorItems,
  clearOrderModalData,
  closeModal,
  moveDown,
  moveUp,
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
    expect(state.burger.constructorItems.ingredients).not.toContainEqual({
      id: 'test_id_1'
    });
  });

  it('должен перемещать ингредиент вверх', () => {
    store.dispatch(moveUp({ index: 1 }));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.constructorItems.ingredients[0].id).toBe('test_id_2');
    expect(state.burger.constructorItems.ingredients[1].id).toBe('test_id_1');
  });

  it('должен перемещать ингредиент вниз', () => {
    store.dispatch(moveDown({ index: 0 }));
    const state = store.getState() as RootState; // Явно указываем тип
    expect(state.burger.constructorItems.ingredients[0].id).toBe('test_id_2');
    expect(state.burger.constructorItems.ingredients[1].id).toBe('test_id_1');
  });
  
});

