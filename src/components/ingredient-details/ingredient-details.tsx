import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/burgerAppSlice';

export const IngredientDetails: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  /** TODO: взять переменную из стора */
  useEffect(() => {
    if (!params.id) {
      navigate('/', { replace: true });
    }
  }, []);

  const ingredients = useSelector(getIngredients);
  const ingredientData = ingredients.find((item) => item._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
