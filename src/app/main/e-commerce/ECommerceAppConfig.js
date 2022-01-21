import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/e-commerce/cart/',
      component: lazy(() => import('./cart/CartApp'))
    },
    {
      path: '/e-commerce/products/branch/:branchid',
      component: lazy(() => import('./products/ProductsApp')),
    },
    {
      path: '/e-commerce/products/all',
      component: lazy(() => import('./products/ProductsApp')),
    },
    {
      path: '/e-commerce/orders/branch/:branchid',
      component: lazy(() => import('./orders/OrdersApp')),
    },
    {
      path: '/e-commerce/orders/all',
      component: lazy(() => import('./orders/OrdersApp')),
    },
    {
      path: '/e-commerce',
      component: () => <Redirect to="/e-commerce/products/all" />,
    },
  ],
};

export default ECommerceAppConfig;
