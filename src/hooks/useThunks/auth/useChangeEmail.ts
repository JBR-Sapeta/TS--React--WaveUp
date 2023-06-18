import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import updateEmail from '@/store/auth/thunks/updateEmail';
import { updateAuthStorage } from '@/utils/authDataStorage';

const useChangeEmail = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const changeEmail = (
    password: string,
    newEmail: string,
    closeModal: () => void
  ) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(updateEmail({ password, newEmail }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        updateAuthStorage(data);
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

  return { changeEmail };
};

export default useChangeEmail;
