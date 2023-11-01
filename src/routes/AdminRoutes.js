import { lazy } from 'react';

// project imports
import MainLayout from 'views/layout/MainLayout';
import Loadable from 'components/admin/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Users = Loadable(lazy(() => import('pages/admin/Users')));
const Languages = Loadable(lazy(() => import('pages/admin/Languages')));
const Verbs = Loadable(lazy(() => import('pages/admin/Verbs')));
const VerbEdit = Loadable(lazy(() => import('pages/admin/VerbEdit')));
const Sentences = Loadable(lazy(() => import('pages/admin/Sentences')));
const SentenceEdit = Loadable(lazy(() => import('pages/admin/SentenceEdit')));
const SystemLog = Loadable(lazy(() => import('pages/admin/SystemLog')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: '/',
  element: (
        <MainLayout />
  ),
  children: [
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
        }
      ]
    },
    {
      path: 'verb',
      children: [
        {
          path: '',
          element: <Verbs />
        },
        {
          path: 'edit/:id',
          element: <VerbEdit />
        }
      ]
    },
    {
      path: 'sentence',
      children: [
        {
          path: '',
          element: <Sentences />
        },
        {
          path: 'edit/:id',
          element: <SentenceEdit />
        }
      ]
    },
    {
      path: 'systemLog',
      children: [
        {
          path: '',
          element: <SystemLog />
        }
      ]
    },
  ]
};

export default AdminRoutes;
