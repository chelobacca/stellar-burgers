import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveDown,
  moveUp,
  removeIngredient
} from '../../services/slices/burgerAppSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(removeIngredient(ingredient._id));
    };

    const handleMoveUp = () => {
      dispatch(moveUp({ index }));
    };

    const handleMoveDown = () => {
      dispatch(moveDown({ index }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
