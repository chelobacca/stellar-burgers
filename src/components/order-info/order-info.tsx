import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import {
  getFeedSelector,
  getIngredients,
  getUserOrders
} from '../../services/slices/burgerAppSlice';
import { redirect, useNavigate, useParams } from 'react-router-dom';
/** TODO: взять переменные orderData и ingredients из стора */
// TODO: брать заказ по номеру?

export const OrderInfo: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ number: string }>();
  if (!params.number) {
    redirect('/feed');
    return null;
  }

  const feed = useSelector(getFeedSelector);
  const orders = feed.orders;
  const ingredients: TIngredient[] = useSelector(getIngredients);

  const orderData = orders.find(
    (item) => item.number === parseInt(params.number!)
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
