import { useAppDispatch } from '@/store';
import { NotificationContextType } from '@/context/NotificationContext';
import activateAccountThunk from '@/store/auth/thunks/activateAccount';



const useActivateAccount = (notificationCtx: NotificationContextType) => {
  const dispatch = useAppDispatch();

  const activateAccount = (activationToken: string) => {
    notificationCtx.showNotification({
      isLoading: true,
      status: null,
      message: '',
    });
    dispatch(activateAccountThunk({ activationToken }))
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

  return { activateAccount };
};

export default useActivateAccount;
