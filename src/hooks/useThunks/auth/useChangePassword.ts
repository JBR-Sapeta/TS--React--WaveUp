import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import updatePassword from '@/store/auth/thunks/updatePassword';

const useChangePassword = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const changePassword = (
    password: string,
    newPassword: string,
    closeModal: () => void
  ) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(updatePassword({ password, newPassword }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        closeModal();
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { changePassword };
};

export default useChangePassword;
