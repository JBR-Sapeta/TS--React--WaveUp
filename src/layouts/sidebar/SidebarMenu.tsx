import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/store';

import { BaseIcon, MenuButton, Avatar } from '@/components';

import ROUTER_PATHS from '@/routes';

import './SidebarMenu.css';

const BASIC_NAVIGATION = [
  {
    to: ROUTER_PATHS.home,
    label: 'route_home',
    icon: <BaseIcon name="MdHomeFilled" />,
  },

  {
    to: ROUTER_PATHS.signin,
    label: 'route_sign_in',
    icon: <BaseIcon name="RiLoginBoxFill" />,
  },
  {
    to: ROUTER_PATHS.signup,
    label: 'route_sign_up',
    icon: <BaseIcon name="BsPersonPlusFill" />,
  },
];

const AUTH_NAVIGATION = [
  {
    to: ROUTER_PATHS.posts,
    label: 'route_posts',
    icon: <BaseIcon name="IoMdImages" />,
  },
  {
    to: ROUTER_PATHS.newpost,
    label: 'route_new_posts',
    icon: <BaseIcon name="BiImageAdd" />,
  },
  {
    to: ROUTER_PATHS.search,
    label: 'route_search',
    icon: <BaseIcon name="ImSearch" />,
  },
  {
    to: ROUTER_PATHS.profile,
    label: 'route_profile',
    icon: <BaseIcon name="RiUser3Fill" />,
  },
  {
    to: ROUTER_PATHS.logout,
    label: 'route_logout',
    icon: <BaseIcon name="RiLogoutBoxFill" />,
  },
];

const sidebarAnimation = {
  initial: { x: -260 },
  animate: { x: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

interface SidebraMenuProps {
  toggelSidebar: () => void;
}

function SidebraMenu({ toggelSidebar }: SidebraMenuProps) {
  const { t } = useTranslation();
  const authState = useAppSelector((state) => state.auth.data);
  const navElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (event: globalThis.MouseEvent): void => {
      if (!navElement.current) {
        return;
      }
      if (!navElement.current.contains(event.target as HTMLElement)) {
        toggelSidebar();
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [toggelSidebar]);

  return (
    <>
      <nav ref={navElement} className="sidenav">

          <motion.div {...sidebarAnimation} className="sidenav__container">
            {authState.token && (
              <div className="sidenav__profile">
                <h3 className="sidenav__name">{authState.username}</h3>
                <div className="sidenav__avatar">
                  <Link to={ROUTER_PATHS.profile}>
                    <Avatar
                      isCircle
                      size="150px"
                      src={authState.avatar}
                      alt="User Avatar"
                    />
                  </Link>
                </div>
              </div>
            )}
            {authState.token ? (
              <div className="sidenav__menu">
                {AUTH_NAVIGATION.map((item) => (
                  <MenuButton key={item.label} to={item.to}>
                    {item.icon}
                    {t(item.label)}
                  </MenuButton>
                ))}
              </div>
            ) : (
              <div className="sidenav__menu">
                {BASIC_NAVIGATION.map((item) => (
                  <MenuButton key={item.label} to={item.to}>
                    {item.icon}
                    {t(item.label)}
                  </MenuButton>
                ))}
              </div>
            )}
          </motion.div>

      </nav>
    </>
  );
}

export default SidebraMenu;
