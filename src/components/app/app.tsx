import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useEffect } from 'react';
import {
  fetchIngredients,
  getIngredients
} from '../../services/slices/burgerAppSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state; // Получаем состояние из location
  const backgroundLocation = location.state?.background;
  const ingredients = useSelector(getIngredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

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
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
