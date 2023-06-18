import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import addLikeThunk from '@/store/posts/thunks/addLike';

const useAddLike = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const addLike = (postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(addLikeThunk({ postId }))
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

  return { addLike };
};

export default useAddLike;
