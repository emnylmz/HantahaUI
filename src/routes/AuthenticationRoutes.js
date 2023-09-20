import { lazy } from 'react';

// project imports
import Loadable from 'components/admin/Loadable';
import MinimalLayout from 'views/layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/SignUp')));
// const Home = Loadable(lazy(() => import('pages/authentication/SignUp')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin/>
    },
    // {
    //   path: '/home',
    //   element: <Home/>
    // },
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    }
  ],
  
};

export default AuthenticationRoutes;

