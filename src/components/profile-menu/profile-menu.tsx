import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/auth/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [dispatch]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
