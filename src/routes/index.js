import AuthenticationRoutes from './AuthenticationRoutes';
import { useRoutes } from 'react-router';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import { getCookie } from 'utils/utils';
import { lazy } from 'react';

// project imports
import Loadable from 'components/admin/Loadable';

export default function ThemeRoutes() {
  const ErrorBoundary = Loadable(lazy(() => import('pages/404/ErrorBoundary')));
  const isAdmin = getCookie('isAdmin') == 'true';
  const token = getCookie('hanTaha-auth-token');
  
  let routes = [
    AuthenticationRoutes,
    UserRoutes,
    {
      path: '*',
      element: <ErrorBoundary />
    }
  ];
  if (isAdmin) routes = [...routes, AdminRoutes];
  const routeResult = useRoutes(routes);
 

  return routeResult;
}
