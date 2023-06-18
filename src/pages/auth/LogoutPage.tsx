import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useAppDispatch } from '@/store';
import { resetUserData } from '@/store/auth';

import { removeAuthStorage } from '@/utils/authDataStorage';

import { BaseIcon } from '@/components';

import ROUTER_PATHS from '@/routes';

import logout from '@/assets/logout.svg';
import './LogoutPage.css';

const pageAnimation = {
  initial: { scale: 0.1 },
  animate: { scale: 1 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

function LogoutPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserData());
    removeAuthStorage();
  }, []);

  return (
    <motion.section {...pageAnimation} className="logout">
      <picture  className="logout__picture">
        <img src={logout} alt="Welcome" className="logout__img" />
      </picture>

      <Link to={ROUTER_PATHS.signin} className="logout__link">
        <BaseIcon name="RiLoginBoxFill" />
        {t('sign_in')}
      </Link>
    </motion.section>
  );
}

export default LogoutPage;
