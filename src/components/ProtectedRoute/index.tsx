// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import { RootState } from 'src/services/store';

// export const ProtectedRoute = ({ accessRoles }: { accessRoles: Role[] }) => {
//   const { user, loading } = useSelector((store: RootState) => store.user);

//   // Если идет загрузка или инициализация
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Если пользователь не авторизован
//   if (!user) {
//     return <Navigate to='/sign-in' />;
//   }

//   // Если роль пользователя отсутствует в разрешенных ролях
//   if (!accessRoles.includes(user.role)) {
//     return <Navigate to='/sign-in' />;
//   }

//   // Если все проверки пройдены, отображаем дочерние элементы
//   return <Outlet />;
// };
