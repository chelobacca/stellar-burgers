import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  getUserOrders
} from '../../services/slices/burgerAppSlice';
import { Preloader } from '@ui';
import { getIsAuthChecked } from '../../services/auth/slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(getIsAuthChecked);
  const orders: TOrder[] | null = useSelector(getUserOrders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (!orders) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
