import { lazy } from 'react';

export const publicRoute = [
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('../pages/guestPages/login/@components/Form/AuthForm')),
    name: 'Login',
  },
  {
    redirectRoute: true,
    name: 'Login',
    path: '/login',
  },
];
