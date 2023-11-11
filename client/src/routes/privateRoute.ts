import { lazy } from 'react';

export const privateRoute = [
  {
    exact: true,
    path: '/',
    component: lazy(() => import('../pages/userPages/socialPage')),
    name: 'home',
  },
  {
    exact: true,
    path: '/messenger',
    component: lazy(() => import('../pages/userPages/messenger')),
  },
  {
    exact: true,
    path: '/profile/:userParamId',
    component: lazy(() => import('../pages/userPages/userProfile')),
  },
  {
    exact: true,
    path: '/profileDetails',
    component: lazy(() => import('../pages/userPages/userProfileDetailsForm')),
  },
  {
    redirectRoute: true,
    path: '/',
  },
];
