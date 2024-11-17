import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/auth/slice';
import { useSelector } from '../../services/store';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <p>Загрузка...</p>;
  // }

  if (!onlyUnAuth && !user) {
    // Маршрут для авторизованного и не авторизован
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // Для неавторизованного и авторизован
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth component={component} />;

// url == /profile, onlyUnAuth = false, user = null
// url == /login, from == /profile onlyUnAuth = true, user = null
// url == /login, from == /profile onlyUnAuth = true, user != null
// url == /profile, onlyUnAuth = false, user != null
// url == /profile, onlyUnAuth = false, user = null

// !onlyUnAuth && user
// onlyUnAuth && !user
