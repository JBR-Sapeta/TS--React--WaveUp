import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import createCommentThunk from '@/store/comments/thunks/createComment';
import { incrementCommentCount } from '@/store/posts';

const useCreateComment = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const createComment = (
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
    dispatch(createCommentThunk({ content, postId }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: 201,
          message: data.message,
        });
        dispatch(incrementCommentCount({ postId }));
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

  return { createComment };
};

export default useCreateComment;
