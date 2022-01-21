import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

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
            type: 'item',
            url: '/relations/providers',
            exact: true,
          },
          {
            id: 'relations-branches',
            title: 'Branches',
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
            type: 'item',
            url: '/e-commerce/cart/',
            exact: true
          },
          {
            id: 'e-commerce-products',
            title: 'Products',
            type: 'item',
            url: '/e-commerce/products/all',
            exact: true,
          },
          {
            id: 'e-commerce-cart',
            title: 'Orders',
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
