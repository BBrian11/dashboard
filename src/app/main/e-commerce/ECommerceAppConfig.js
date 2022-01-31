import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'ecommercepage', en);
i18next.addResourceBundle('es', 'ecommercepage', es);

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
      path: '/e-commerce/products',
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
      component: () => <Redirect to="/e-commerce/products" />,
    },
  ],
};

export default ECommerceAppConfig;
