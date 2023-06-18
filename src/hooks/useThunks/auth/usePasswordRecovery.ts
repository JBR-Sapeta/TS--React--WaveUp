import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import newPassword from '@/store/auth/thunks/newPassword';

import ROUTER_PATHS from '@/routes';

const usePasswordRecovery = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setNewPassword = (password: string, passwordResetToken: string) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(newPassword({ password, passwordResetToken }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        navigate(ROUTER_PATHS.signin, { replace: true });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { setNewPassword };
};

export default usePasswordRecovery;
