import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import Home from './pages/Home';

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
];
export default routerConfig;
