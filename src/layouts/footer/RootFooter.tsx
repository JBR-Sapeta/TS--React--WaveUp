import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseIcon } from '@/components';

import { useAppSelector } from '@/store';

import ROUTER_PATHS from '@/routes';

import './RootFooter.css';

const MEDIA_LINKS = [
  {
    href: 'https://www.facebook.com',
    label: 'Facebook',
    element: <BaseIcon name="FaFacebook" />,
  },
  {
    href: 'https://www.instagram.com',
    label: 'Instagram',
    element: <BaseIcon name="AiFillInstagram" />,
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    element: <BaseIcon name="FaTwitter" />,
  },
  {
    href: 'https://www.youtube.com/',
    label: 'YouTube',
    element: <BaseIcon name="FaYoutube" />,
  },
];

const BASIC_NAVIGATION = [
  { to: ROUTER_PATHS.home, label: 'route_home' },
  { to: ROUTER_PATHS.signup, label: 'route_sign_up' },
];

const AUTH_NAVIGATION = [
  { to: ROUTER_PATHS.posts, label: 'route_posts' },
  { to: ROUTER_PATHS.search, label: 'route_search' },
  { to: ROUTER_PATHS.profile, label: 'route_profile' },
];

function RootFooter() {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth.data);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__baner">
          <div className="footer__logo">
            <h2 className="footer__header">WaveUp</h2>
            <p className="footer__slogan">Explore, Talk, Meet</p>
          </div>
          <div className="footer__navigation">
            {token ? (
              <>
                {AUTH_NAVIGATION.map((link) => (
                  <Link
                    key={link.label}
                    className="footer__link hover-animation"
                    to={link.to}
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {BASIC_NAVIGATION.map((link) => (
                  <Link
                    key={link.label}
                    className="footer__link hover-animation"
                    to={link.to}
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
        <hr className="footer__hr" />
        <div className="footer__media">
          <ul className="footer__list">
            {MEDIA_LINKS.map((link) => (
              <li key={link.label} className="footer__li  ">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com"
                  className="footer__a hover-animation"
                >
                  {link.element}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__rights">
          <p>{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default RootFooter;
