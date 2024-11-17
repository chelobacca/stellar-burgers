import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  selectConstructorItems,
  selectOrderModalData,
  orderRequestSelector,
  postNewOrder,
  clearOrderModalData
} from '../../services/slices/burgerAppSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getIsAuthChecked } from '../../services/auth/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(selectOrderModalData);

  // оформть заказ
  const onOrderClick = () => {
    if (!isAuthChecked) {
      return navigate('/login', { replace: true });
    }
    const { bun, ingredients } = constructorItems;
    if (!constructorItems.bun || orderRequest) return;

    const orderData: string[] = [
      bun?._id!,
      ...ingredients.map((ingredient) => ingredient._id),
      bun?._id!
    ];

    dispatch(postNewOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun && constructorItems.bun.price
        ? constructorItems.bun.price * 2
        : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
