import { useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import getUserPostsThunk from '@/store/posts/thunks/getUserPosts';

const useGetUserPosts = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const getUserPosts = useCallback(
    (userId: number, size: number, page: number) => {
      dispatch(getUserPostsThunk({ userId, size, page }))
        .unwrap()
        .catch((err) => {
          notificationCtx.showNotification({
            isLoading: false,
            status: err.status,
            message: err.message,
          });
        });
    },
    []
  );

  return { getUserPosts };
};

export default useGetUserPosts;
