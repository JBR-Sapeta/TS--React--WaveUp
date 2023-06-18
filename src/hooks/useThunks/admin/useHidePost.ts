import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import hidePostThunk from '@/store/admin/hidePost';

const useHidePost = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const hidePost = (postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(hidePostThunk({ postId }))
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

  return { hidePost };
};

export default useHidePost;
