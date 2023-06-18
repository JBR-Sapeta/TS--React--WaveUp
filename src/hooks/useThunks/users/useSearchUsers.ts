import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import getUsers from '@/store/users/thunks/getUsers';
import getUsersByName from '@/store/users/thunks/getUsersByName';

const useSearchUsers = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const searchUsers = (
    name: string,
    page: number,
    size: number,
  ) => {
    const data = { name, page, size };
    if (name) {
      dispatch(getUsersByName(data))
        .unwrap()
        .catch((err) => {
          notificationCtx.showNotification({
            isLoading: false,
            status: err.status,
            message: err.message,
          });
        });
    } else {
      dispatch(getUsers(data))
        .unwrap()
        .catch((err) => {
          notificationCtx.showNotification({
            isLoading: false,
            status: err.status,
            message: err.message,
          });
        });
    }
  };

  return { searchUsers };
};

export default useSearchUsers;
