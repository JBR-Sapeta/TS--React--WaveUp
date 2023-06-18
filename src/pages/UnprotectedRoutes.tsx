import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from '@/store';

import ROUTER_PATHS from '@/routes';

function UnprotectedRoutes() {
  const isAuthenticated = useAppSelector((state) => state.auth.data.token);

  if (isAuthenticated) {
    return <Navigate to={ROUTER_PATHS.posts} />;
  }

  return <Outlet />;
}

export default UnprotectedRoutes;
