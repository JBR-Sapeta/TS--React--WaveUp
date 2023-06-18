import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import unbanUserThunk from '@/store/admin/unbanUser';

const useUnbanUser = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const unbanUser = (userId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(unbanUserThunk({ userId }))
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

  return { unbanUser };
};

export default useUnbanUser;
