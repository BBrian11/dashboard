import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

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
