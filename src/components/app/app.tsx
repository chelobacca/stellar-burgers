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
import { useDispatch } from 'src/services/store';
// import { ProtectedRoute } from '../ProtectedRoute';

const App = () => {
  const location = useLocation();
  const state = location.state; // Получаем состояние из location
  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            // <ProtectedRoute>
            <Register />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            // <ProtectedRoute>
            <ForgotPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            // <ProtectedRoute>
            <ProfileOrders />
            // </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            // <ProtectedRoute>
            <OrderInfo />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
