import { lazy } from 'react';
import Loadable from 'components/admin/Loadable';
import Layout from 'views/layout/Layout';

// dashboard routing
const Home = Loadable(lazy(() => import('pages/user/Home')));

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
  path: '/',
  element: (
        <Layout />
  ),
  children: [
    {
      path: '/',
      element: <Home/>
    },
    {
      path: 'home',
      element: <Home/>
    }
  ]
};

export default UserRoutes;
