import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import banUserThunk from '@/store/admin/banUser';

const useBanUser = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const banUser = (userId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(banUserThunk({ userId }))
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

  return { banUser };
};

export default useBanUser;
