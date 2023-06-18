import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import updateAccountThunk from '@/store/auth/thunks/updateAccount';
import { updateAuthStorage } from '@/utils/authDataStorage';

export interface UpdateAccountData {
  id: number;
  username: string;
  image: string | null;
  description: string | null;
  birthday: string | null;
  city: string | null;
  token: string;
  language: string;
}

const useUpdateAccount = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const updateAccount = (
    data: UpdateAccountData,
    closeForm: () => void
  ) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(updateAccountThunk(data))
      .unwrap()
      .then((data) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: 200,
          message: 'Succes !',
        });
        closeForm();
        updateAuthStorage(data);
      })
      .catch((err) => {
        notificationCtx.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  return { updateAccount };
};

export default useUpdateAccount;
