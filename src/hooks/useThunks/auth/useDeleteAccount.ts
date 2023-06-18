import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import deleteAccountThunk from '@/store/auth/thunks/deleteAccount';

const useDeleteAccount = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const deleteAccount = (password: string, closeModal: () => void) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(deleteAccountThunk({ password }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        closeModal();
        navigation('/', { replace: true });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { deleteAccount };
};

export default useDeleteAccount;
