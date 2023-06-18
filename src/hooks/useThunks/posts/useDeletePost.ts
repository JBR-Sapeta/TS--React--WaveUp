import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import deletePostThunk from '@/store/posts/thunks/deletePost';

const useDeletePost = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const deletePost = (postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(deletePostThunk({ postId }))
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

  return { deletePost };
};

export default useDeletePost;
