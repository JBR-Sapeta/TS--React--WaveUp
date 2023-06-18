import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseIcon } from '@/components';

import ROUTER_PATHS from '@/routes';

import unlock from '@/assets/unlock.svg';
import './WelcomePage.css';

function WelcomePage() {
  const { t } = useTranslation();

  return (
    <section className="welcome">
      <picture className="welcome__picture">
        <img src={unlock} alt="Welcome" className="welcome__img" />
      </picture>
      <p className="welcome__message">{t('message_welcome')}</p>
      <Link to={ROUTER_PATHS.signin} className="welcome__link">
        <BaseIcon name="RiLoginBoxFill" />
        {t('sign_in')}
      </Link>
    </section>
  );
}

export default WelcomePage;
