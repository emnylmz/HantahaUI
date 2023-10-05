import { lazy } from 'react';

// project imports
import MainLayout from 'views/layout/MainLayout';
import Loadable from 'components/admin/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Users = Loadable(lazy(() => import('pages/admin/Users')));
const Languages = Loadable(lazy(() => import('pages/admin/Languages')));
const LanguageEdit = Loadable(lazy(() => import('pages/admin/LanguageEdit')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
        <MainLayout />
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    
    {
      path: '/adminHome',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: '',
          element: <Users />
        }
      ]
    },
    {
      path: 'language',
      children: [
        {
          path: '',
          element: <Languages />
        },
        {
          path: 'edit/:id', // ID değeri için dinamik yol
          element: <LanguageEdit />
        }
      ]
    },
  ]
};

export default MainRoutes;
