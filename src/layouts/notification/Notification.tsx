import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { BaseIcon } from '@/components';

import {
  NotificationData,
  NotificationContext,
} from '@/context/NotificationContext';

import './Notification.css';

function Notification({ isLoading, status, message }: NotificationData) {
  const { t } = useTranslation();
  const notificationContext = useContext(NotificationContext);

  const isSuccess = status && status < 400;

  const contentClass = classNames({
    'notification__container--succes': isSuccess,
    'notification__container--error': !isSuccess,
  });

  return (
    <>
      <div className="notification">
        {isLoading && (
          <div className="notification__container--pending">
            <div className="notification__spinner">
              <BaseIcon name="AiOutlineLoading3Quarters" />
            </div>
            <p> {t('message_pending')}...</p>
          </div>
        )}
        {!isLoading && (
          <div className={contentClass}>
            <div className="notification__contetnt">
              {isSuccess ? (
                <BaseIcon name="BiCheckCircle" />
              ) : (
                <BaseIcon name="BiErrorCircle" />
              )}
              <p>{message}</p>
            </div>

            <button
              type="button"
              onClick={notificationContext.hideNotification}
            >
              {t('button_close')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Notification;
