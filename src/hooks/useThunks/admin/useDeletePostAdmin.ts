import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import deletePostAdminThunk from '@/store/admin/deletePostAdmin';

const useDeletePostAdmin = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const deletePostAdmin = (postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(deletePostAdminThunk({ postId }))
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

  return { deletePostAdmin };
};

export default useDeletePostAdmin;
