import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'DASHBOARD',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
      },
      {
        id: 'relations',
        title: 'Relations',
        translate: 'RELATIONS',
        type: 'collapse',
        icon: 'apartment',
        url: '/relations',
        children: [
          {
            id: 'relations-providers',
            title: 'Providers',
            translate: 'PROVIDERS',
            type: 'item',
            url: '/relations/providers',
            exact: true,
          },
          {
            id: 'relations-branches',
            title: 'Branches',
            translate: 'BRANCHES',
            type: 'item',
            url: '/relations/branches',
            exact: true,
          },
        ]
      },
      {
        id: 'e-commerce',
        title: 'E-commerce',
        translate: 'ECOMMERCE',
        type: 'collapse',
        icon: 'shopping_cart',
        url: '/e-commerce',
        children: [
          {
            id: 'e-commerce-cart',
            title: 'Cart',
            translate: 'CART',
            type: 'item',
            url: '/e-commerce/cart/',
            exact: true
          },
          {
            id: 'e-commerce-products',
            title: 'Products',
            translate: 'PRODUCTS',
            type: 'item',
            url: '/e-commerce/products/all',
            exact: true,
          },
          {
            id: 'e-commerce-orders',
            title: 'Orders',
            translate: 'ORDERS',
            type: 'item',
            url: '/e-commerce/orders/all',
            exact: true
          },
        ]
      }
    ],
  },
];

export default navigationConfig;
