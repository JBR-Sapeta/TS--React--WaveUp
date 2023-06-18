import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import createPostThunk from '@/store/posts/thunks/createPost';

const useCreatePost = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const createPost = (
    content: string,
    file: File | null,
    closeForm: () => void
  ) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(createPostThunk({ content, file }))
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
      });
  };

  return { createPost };
};

export default useCreatePost;
