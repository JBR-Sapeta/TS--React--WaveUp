import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import updatePostThunk from '@/store/posts/thunks/updatePost';

const useUpdatePost = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const updatePost = (
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
    dispatch(updatePostThunk({ content, postId }))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: data.status,
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

  return { updatePost };
};

export default useUpdatePost;
