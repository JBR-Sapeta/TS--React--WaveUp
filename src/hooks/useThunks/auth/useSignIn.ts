import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import signInThunk from '@/store/auth/thunks/signIn';
import { setAuthStorage } from '@/utils/authDataStorage';

import ROUTER_PATHS from '@/routes';

const useSignIn = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = (email: string, password: string) => {
    dispatch(signInThunk({ email, password }))
      .unwrap()
      .then((data) => {
        setAuthStorage(data);
        navigate(ROUTER_PATHS.posts, { replace: true });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { signIn };
};

export default useSignIn;
