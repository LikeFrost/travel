import BasicLayout from '@/layouts/BasicLayout';
import Home from './pages/Home';
import Login from './pages/Login';

const routerConfig = [
  {
    path: '/home',
    exact: true,
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
    ],
  },
  {
    path: '/',
    exact: true,
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Login,
      },
    ],
  },
];
export default routerConfig;
