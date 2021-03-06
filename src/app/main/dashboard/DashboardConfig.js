import i18next from 'i18next';
import Dashboard from './Dashboard';
import en from './i18n/en';
import { authRoles } from 'app/auth';


i18next.addResourceBundle('en', 'dashboardPage', en);


const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
    },
  ],
};

export default DashboardConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
