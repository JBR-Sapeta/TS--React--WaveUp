import { useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/store';
import { useActivateAccount } from '@/hooks';

import { NotificationContext } from '@/context/NotificationContext';

import { BaseIcon } from '@/components';

import ROUTER_PATHS from '@/routes';

import welcome from '@/assets/activated.svg';
import './ActivationPage.css';

const pageAnimation = {
  initial: { scale: 0.1 },
  animate: { scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function ActivationPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { error, status, message, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const notificationContext = useContext(NotificationContext);
  const { activateAccount } = useActivateAccount(notificationContext);
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      activateAccount(token);
    }
  }, []);

  const showMessage = status && status < 400 && !isLoading;

  return (
    <motion.section {...pageAnimation} className="activation">
      <picture className="activation__picture">
        <img src={welcome} alt="Welcome" className="activation__img" />
      </picture>

      {showMessage && <p className="activation__message">{message}</p>}

      {error?.validationErrors?.token && (
        <p className="activation__error">{error?.validationErrors?.token}</p>
      )}

      <Link to={ROUTER_PATHS.signin} className="activation__link">
        <BaseIcon name="RiLoginBoxFill" />
        {t('sign_in')}
      </Link>
    </motion.section>
  );
}

export default ActivationPage;
