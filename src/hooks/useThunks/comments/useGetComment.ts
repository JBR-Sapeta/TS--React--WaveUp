import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import getCommentsThunk from '@/store/comments/thunks/getComments';

const useGetComments = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const getComments = (
    postId: number,
    page: number,
    isLoading: (state: boolean) => void
  ) => {
    isLoading(true);
    dispatch(getCommentsThunk({ postId, page }))
      .unwrap()
      .then((_) => {
        isLoading(false);
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
        isLoading(false);
      });
  };

  return { getComments };
};

export default useGetComments;
