import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { BaseIcon } from '@/components';

import ROUTER_PATHS from '@/routes';

import notFound from '@/assets/404.svg';

import './ErrorPage.css';

const pageAnimation = {
  initial: { scale: 0.1 },
  animate: { scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <motion.section {...pageAnimation} className="error-page">
      <picture className="error-page__picture">
        <img src={notFound} alt="Error" className="error-page__img" />
      </picture>

      <Link to={ROUTER_PATHS.home} className="error-page__link ">
        <BaseIcon name="ImArrowLeft" />
        {t('go_back')}
      </Link>
    </motion.section>
  );
}

export default ErrorPage;
