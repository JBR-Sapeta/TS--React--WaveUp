import { createContext, useState, useEffect, ReactNode } from 'react';

export interface NotificationData {
  isLoading: boolean;
  status: number | null;
  message: string;
}

export type NotificationContextType = {
  notification: NotificationData | null;
  showNotification: (data: NotificationData) => void;
  hideNotification: () => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: (data: NotificationData) => {},
  hideNotification: () => {},
});

interface NotificationContextProps {
  children: ReactNode;
}

function NotificationContextProvider({ children }: NotificationContextProps) {
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );
  useEffect(() => {
    if (!notification?.isLoading) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const showNotificationHandler = (data: NotificationData) => {
    setNotification(data);
  };

  const hideNotificationHandler = () => {
    setNotification(null);
  };

  const context = {
    notification: notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
