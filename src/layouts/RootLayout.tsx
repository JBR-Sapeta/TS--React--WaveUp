import { useState, useCallback, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

import { NotificationContext } from '@/context/NotificationContext';

import RootNavigation from './navigation/RootNavigation';

import RootMain from './main/RootMain';
import RootFooter from './footer/RootFooter';
import Notification from './notification/Notification';
import { MobileBackdrop } from '@/components';

function RootLayout() {
  const { pathname } = useLocation();
  const notificationContext = useContext(NotificationContext);
  const notification = notificationContext.notification;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggelSidebar = useCallback((): void => {
    setIsSidebarOpen((state) => !state);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <RootNavigation toggelSidebar={toggelSidebar} isOpen={isSidebarOpen} />
      <RootMain toggelSidebar={toggelSidebar} isOpen={isSidebarOpen}>
        <Outlet />
      </RootMain>
      {notification && (
        <Notification
          isLoading={notification.isLoading}
          status={notification.status}
          message={notification.message}
        />
      )}

      <RootFooter />
      {isSidebarOpen && <MobileBackdrop />}
    </>
  );
}

export default RootLayout;
