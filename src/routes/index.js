import AuthenticationRoutes from './AuthenticationRoutes';
import { useRoutes } from 'react-router';
import MainRoutes from './MainRoutes';
import { getCookie } from 'utils/utils';

export default function ThemeRoutes() {
  const isAdmin = getCookie('isAdmin') === 'true';
  let routes = [AuthenticationRoutes];
  if (isAdmin) routes = [...routes, MainRoutes];
  const routeResult = useRoutes(routes);

  // test için burayı aç
  // const routeResult = useRoutes([MainRoutes,AuthenticationRoutes]); 

  return (
    isAdmin ? (
      {routeResult}):(routeResult)
  );
}
