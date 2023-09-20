import AuthenticationRoutes from './AuthenticationRoutes';
import { useRoutes } from 'react-router';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  // const isAdmin = localStorage.getItem('isAdmin') === 'true';
  // let routes = [AuthenticationRoutes];
  // if (isAdmin) routes = [...routes, MainRoutes];
  // const routeResult = useRoutes(routes);

  // test için burayı aç
  const routeResult = useRoutes([MainRoutes,AuthenticationRoutes]); 

  return (
    <>
      {routeResult}
      {/* <ErrorBoundary/> */}
    </>
  );
}
