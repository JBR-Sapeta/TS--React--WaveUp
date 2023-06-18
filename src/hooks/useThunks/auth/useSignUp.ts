import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import signUpThunk from '@/store/auth/thunks/signUp';
import ROUTER_PATHS from '@/routes';

const useSignUp = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const signUp = (accountName: string, email: string, password: string) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(signUpThunk({ accountName, email, password }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        navigation(ROUTER_PATHS.welcome, { replace: true });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { signUp };
};

export default useSignUp;
