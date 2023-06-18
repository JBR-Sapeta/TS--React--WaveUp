import { useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { resetValidationErrors } from '@/store/auth';

import { NotificationContext } from '@/context/NotificationContext';

import { usePasswordRecovery } from '@/hooks';

import { RecoveryForm, AuthHeader } from '@/components';

import ROUTER_PATHS from '@/routes';

import './Auth.css';
import './RecoveryPage.css';

const pageAnimation = {
  initial: { scale: 0.95 },
  animate: { scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function ResetPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const notificationContext = useContext(NotificationContext);
  const [searchParams, _] = useSearchParams();
  const { setNewPassword } = usePasswordRecovery(notificationContext);
  const resetToken = searchParams.get('reset') || '';

  const formHandler = (password: string): void => {
    setNewPassword(password, resetToken);
  };

  useEffect(() => {
    dispatch(resetValidationErrors());
  }, [dispatch]);

  return (
    <motion.section
      {...pageAnimation}
      className="auth-form auth-form--recovery "
    >
      <div className="auth-form__container auth-form__container--recovery">
        <AuthHeader>{t('recovery_header')}</AuthHeader>

        <RecoveryForm
          isLoading={authState.isLoading}
          validationErrors={authState.error.validationErrors}
          formHandler={formHandler}
        />

        <div className="auth-form__links">
          <Link className="auth-form__link" to={ROUTER_PATHS.signup}>
            {t('sign_up')}
          </Link>
          <span className="auth-form__span">|</span>
          <Link className="auth-form__link" to={ROUTER_PATHS.signin}>
            {t('sign_in')}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default ResetPage;
