import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  getUserOrders
} from '../../services/slices/burgerAppSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] | null = useSelector(getUserOrders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (!orders) {
    return <Preloader />;
  }
  console.log(orders);

  return <ProfileOrdersUI orders={orders} />;
};
