import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useEffect } from 'react';
import {
  closeModal,
  fetchIngredients,
  getIngredients,
  modalSelector
} from '../../services/slices/burgerAppSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const state = location.state; // Получаем состояние из location
  const backgroundLocation = location.state?.background;
  const ingredients = useSelector(getIngredients);
  const isModalOpened = useSelector(modalSelector);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
      </Routes>

      {/* МОДАЛЬНЫЕ ОКНА */}
      {isModalOpened && backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Заказ'} onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={'Заказ'} onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

// При клике по заказу открывается модальное окно с информацией о заказе и происходит переход
// на маршрут /feed/:id или /profile/orders/:id — в зависимости от того, на какой странице пользователь кликнул по заказу.
// При прямом переходе на эти маршруты открывается страница заказа.

// Запросы к серверу вызываются из хука useEffect с корректно заданным массивом зависимостей
// или при возникновении событий.

// Запросы к серверу выполняемые только авторизированным пользователем
// (оформление заказа, получение и обновление данных пользователя,
// получение списка заказов пользователя) включает механику
// обновления токена авторизации описанную в
// функции fetchWithRefresh файла utils/burger-api.ts стартеркита.
