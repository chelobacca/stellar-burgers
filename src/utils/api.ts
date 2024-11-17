// // В проектной работе эта функция будет обращаться к серверу
// // и обновлять токены если они уже устарели.

// import { TUser } from '@utils-types';

// const getUser = async (): Promise<TUser> => {
//   const request: Promise<TUser> = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(null);
//     });
//   });

//   try {
//     return await request;
//   } catch (error) {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     throw error;
//   }
// };

// // const login = (): Promise<TUser> =>
// //   new Promise((resolve) => {
// //     setTimeout(() => {
// //       localStorage.setItem('accessToken', 'test-token');
// //       localStorage.setItem('refreshToken', 'test-refresh-token');
// //       resolve(null);
// //     }, 1000);
// //   });

// const logout = (): Promise<void> =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       resolve();
//     }, 1000);
//   });

// export const api = {
//   getUser,
//   // login,
//   logout
// };
