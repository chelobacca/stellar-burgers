import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { mockIngredient, mockStore } from '../src/services/mockData';
import { rootReducer, RootState } from '../src/services/store';
import {
  addIngredient,
  clearConstructorItems,
  clearOrderModalData,
  closeModal,
  openModal,
  
} from '../src/services/slices/burgerAppSlice';


describe('Синхронные экшены', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: mockStore,
    });
  });

  it('должен добавлять ингредиент в состояние', () => {
    
    store.dispatch(addIngredient(mockIngredient)); // Диспетчируем экшен

    // Получаем текущее состояние
    const state = store.getState() as RootState; // Явно указываем тип

    // Проверяем, что ингредиент добавлен
    expect(state.burger.constructorItems.ingredients).toContainEqual(mockIngredient);
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










});