import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import updateCommentThunk from '@/store/comments/thunks/updateComment';

const useUpdateComment = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const updateComment = (
    commentId: number,
    postId: number,
    content: string,
    closeForm: () => void,
    setErrorMessage: (content: string) => void
  ) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(updateCommentThunk({ content, postId, commentId }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: 201,
          message: data.message,
        });
        closeForm();
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
        setErrorMessage(err?.validationErrors?.content || '');
      });
  };

  return { updateComment };
};

export default useUpdateComment;
