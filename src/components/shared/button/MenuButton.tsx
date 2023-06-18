import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import './MenuButton.css';

interface MenuButtonProps {
  children: ReactNode;
  to: string;
}

function MenuButton({ children, to }: MenuButtonProps) {
  return (
    <NavLink to={to} className="menu__button" type="button">
      {children}
    </NavLink>
  );
}

export default MenuButton;
