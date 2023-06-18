import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import showPostThunk from '@/store/admin/showPost';

const useShowPost = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const showPost = (postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(showPostThunk({ postId }))
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

  return { showPost };
};

export default useShowPost;
