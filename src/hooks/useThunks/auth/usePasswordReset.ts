import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import resetPasswordThunk from '@/store/auth/thunks/resetPassword';

const useResetPassword = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const resetPassword = (email: string) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(resetPasswordThunk({ email }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { resetPassword };
};

export default useResetPassword;
