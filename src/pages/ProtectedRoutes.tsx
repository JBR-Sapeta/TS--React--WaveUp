import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from '@/store';

import ROUTER_PATHS from '@/routes';

function ProtectedRoutes() {
  const isAuthenticated = useAppSelector((state) => state.auth.data.token);

  if (!isAuthenticated) {
    return <Navigate to={ROUTER_PATHS.signin} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
