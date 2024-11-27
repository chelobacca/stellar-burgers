import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/burgerAppSlice';

export const IngredientDetails: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true });
    }
  }, [id, navigate]);

  const ingredients = useSelector(getIngredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
