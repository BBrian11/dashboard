import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'relationspage', en);
i18next.addResourceBundle('es', 'relationspage', es);

const RelationsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/relations/providers',
      component: lazy(() => import('./providers/ProvidersApp')),
    },
    {
      path: '/relations/branches',
      component: lazy(() => import('./branches/BranchesApp')),
    },
    {
      path: '/relations',
      component: () => <Redirect to="/relations/providers" />,
    },
  ],
};

export default RelationsAppConfig;
