import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import resetCommentThunk from '@/store/admin/resetComment';

const useResteComment = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const resetComment = (commentId: number, postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(resetCommentThunk({ commentId, postId }))
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

  return { resetComment };
};

export default useResteComment;
