import { useAppDispatch } from '@/store';
import { decrementCommentCount } from '@/store/posts';
import { NotificationContextType } from '@/context/NotificationContext';
import deleteCommentThunk from '@/store/comments/thunks/deleteComment';

const useDeleteComment = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const deleteComment = (commentId: number, postId: number) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(deleteCommentThunk({ postId, commentId }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
          message: data.message,
        });
        dispatch(decrementCommentCount({ postId }));
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { deleteComment };
};

export default useDeleteComment;
