import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { resetValidationErrors } from '@/store/auth';

import { NotificationContext } from '@/context/NotificationContext';

import { useSignUp } from '@/hooks';

import { AuthHeader, SignUpForm } from '@/components';

import ROUTER_PATHS from '@/routes';

import './Auth.css';
import './SignUpPage.css';

const pageAnimation = {
  initial: { scale: 0.95  },
  animate: { scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function SignUpPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const notificationContext = useContext(NotificationContext);
  const { signUp } = useSignUp(notificationContext);

  const formHandler = (
    accountName: string,
    email: string,
    password: string
  ): void => {
    signUp(accountName, email, password);
  };

  useEffect(() => {
    dispatch(resetValidationErrors());
  }, [dispatch]);

  return (
    <motion.section {...pageAnimation} className="auth-form auth-form--signup ">
      <div className="auth-form__container auth-form__container--signup">
        <AuthHeader>{t('sign_up_header')}</AuthHeader>

        <SignUpForm
          isLoading={authState.isLoading}
          validationErrors={authState.error.validationErrors}
          formHandler={formHandler}
        />

        <div className="auth-form__links">
          <Link className="auth-form__link" to={ROUTER_PATHS.signin}>
            {t('sign_in')}
          </Link>
          <span className="auth-form__span">|</span>
          <Link className="auth-form__link" to={ROUTER_PATHS.reset}>
            {t('reset_password')}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default SignUpPage;
