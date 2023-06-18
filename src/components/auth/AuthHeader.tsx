import { ReactNode } from 'react';

import './AuthHeader.css';
import "./AuthForm.css"

interface AuthHeaderProps {
  children: ReactNode;
  isBlack?: boolean;
}

function AuthHeader({ children, isBlack = false }: AuthHeaderProps) {
  return (
    <div
      className={`auth-header__block ${
        isBlack ? 'auth-header__block--black ' : ''
      }`}
    >
      <h2 className="auth-header__header">WaveUp</h2>
      <hr className="auth-header__hr" />
      <p className="auth-header__slogan">{children}</p>
    </div>
  );
}

export default AuthHeader;
