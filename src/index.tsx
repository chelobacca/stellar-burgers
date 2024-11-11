import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store, { useSelector } from './services/store';
import {
  fetchFeed,
  fetchIngredients,
  getIngredients
} from './services/slices/burgerAppSlice';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// //получаем состояние хранилища при загрузке приложения
// const currentState = store.getState();
// console.log(currentState);
