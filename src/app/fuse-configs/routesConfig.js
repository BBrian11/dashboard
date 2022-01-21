import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import Error404Page from 'app/main/404/Error404Page';
import mainConfigs from 'app/main/mainConfigs';

const routeConfigs =
  [
    ...mainConfigs
  ];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/login" />,
  },
  {
		component:() => <Redirect to="/dashboard"/>
	},
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
