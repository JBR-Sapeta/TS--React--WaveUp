import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import removeLikeThunk from '@/store/posts/thunks/removeLike';

const useRemoveLike = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const removeLike = (postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(removeLikeThunk({ postId }))
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

  return { removeLike };
};

export default useRemoveLike;
