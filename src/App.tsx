import { useEffect } from 'react';

import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { useAppDispatch } from './store';
import { setUserData, resetUserData } from './store/auth';

import { getAuthStorage, removeAuthStorage } from '@/utils/authDataStorage';

import RootLayout from '@/layouts/RootLayout';

import {
  ProtectedRoutes,
  UnprotectedRoutes,
  SignInPage,
  SignUpPage,
  LogoutPage,
  ActivationPage,
  ResetPage,
  RecoveryPage,
  WelcomePage,
  ErrorPage,
  HomePage,
  PostsPage,
  NewPostPage,
  ProfilePage,
  SearchPage,
  UserPage,
} from '@/pages';

import ROUTER_PATHS from '@/routes';

const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route element={<UnprotectedRoutes />}>
        <Route path={ROUTER_PATHS.home} element={<HomePage />} />
        <Route path={ROUTER_PATHS.signin} element={<SignInPage />} />
        <Route path={ROUTER_PATHS.signup} element={<SignUpPage />} />
        <Route path={ROUTER_PATHS.reset} element={<ResetPage />} />
        <Route path={ROUTER_PATHS.recovery} element={<RecoveryPage />} />
        <Route path={ROUTER_PATHS.activation} element={<ActivationPage />} />
        <Route path={ROUTER_PATHS.welcome} element={<WelcomePage />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTER_PATHS.posts} element={<PostsPage />} />
        <Route path={ROUTER_PATHS.newpost} element={<NewPostPage />} />
        <Route path={ROUTER_PATHS.profile} element={<ProfilePage />} />
        <Route path={`${ROUTER_PATHS.search}/:userId`} element={<UserPage />} />
        <Route path={ROUTER_PATHS.search} element={<SearchPage />} />
      </Route>
      <Route path={ROUTER_PATHS.logout} element={<LogoutPage />} />
    </Route>
  )
);

function App() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    const storedData = getAuthStorage();
    if (storedData) {
      dispatch(setUserData(storedData.user));
      const timeout = setTimeout(() => {
        dispatch(resetUserData());
        removeAuthStorage();
      }, storedData.duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  

  return <RouterProvider router={ROUTER} />;
}

export default App;
