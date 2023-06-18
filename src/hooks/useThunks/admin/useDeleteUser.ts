import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import deleteUserThunk from '@/store/admin/deleteUser';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '@/routes';

const useDeleteUser = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const deleteUser = (
    userId: number,
    password: string,
    closeModeal: () => void
  ) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(deleteUserThunk({ userId, password }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        closeModeal();
        navigation(ROUTER_PATHS.search, { replace: true });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { deleteUser };
};

export default useDeleteUser;
