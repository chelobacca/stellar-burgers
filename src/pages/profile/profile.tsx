import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/auth/slice';
import { patchUpdateUser } from '../../services/auth/slice';
import { Preloader } from '@ui';
import { selectLoading } from '../../services/auth/slice';

export const Profile: FC = () => {
  const user = useSelector(getUser);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(
    user
      ? { name: user.name, email: user.email, password: '' }
      : { name: '', email: '', password: '' }
  );

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  //отправить отредактированные данные пользователя по сабмиту
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(patchUpdateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue(
      user
        ? { name: user.name, email: user.email, password: '' }
        : { name: '', email: '', password: '' }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return <Preloader />;
  }
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
