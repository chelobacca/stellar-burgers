import { rootReducer } from '../src/services/store'; 
import { authSlice } from '../src/services/auth/slice';
import { burgerApp } from '../src/services/slices/burgerAppSlice';

describe('rootReducer', () => {
  it('вызов rootReducer с undefined состоянием и экшеном UNKNOWN_ACTION возвращает корректное начальное состояние хранилища.', () => {
    const initialState = {
      auth: authSlice.getInitialState(),
      burgerApp: burgerApp.getInitialState(),
    };

    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(newState).toEqual(initialState);
  });
});
