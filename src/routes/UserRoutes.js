import { lazy } from 'react';
import Loadable from 'components/admin/Loadable';
import Layout from 'views/layout/Layout';

// dashboard routing
const Home = Loadable(lazy(() => import('pages/user/Home')));
const Contact = Loadable(lazy(() => import('pages/user/Contact')));

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
    },
    {
      path: 'contact',
      element: <Contact/>
    }
  ]
};

export default UserRoutes;
