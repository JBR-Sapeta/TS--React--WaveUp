/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */

import { ReactNode } from 'react';

import classNames from 'classnames';

import './GrayButton.css';

interface GrayButtonProps {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  isActive?: boolean;
  isRounded?: boolean;
  isRed?: boolean;
  hasRedIcon?: boolean;
  isGreen?: boolean;
  height?: '32px' | '36px';
  fixedWidth?: '160px' | '120px' | 'none';
  onClick?: () => void;
}

function GrayButton({
  children,
  type,
  isDisabled = false,
  isActive = false,
  isRounded = false,
  isRed = false,
  hasRedIcon = false,
  isGreen = false,
  height = '32px',
  fixedWidth = 'none',
  onClick,
}: GrayButtonProps) {
  const buttonClasses = classNames('gray-button', {
    'gray-button--rounded': isRounded,
    'gray-button--disabled': isDisabled,
    'gray-button--active': isActive,
    'gray-button--red': isRed,
    'gray-button--red-icon': hasRedIcon,
    'gray-button--green': isGreen,
    'gray-button--w160': fixedWidth === '160px',
    'gray-button--w120': fixedWidth === '120px',
    'gray-button--h36': height === '36px',
  });

  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      
    >
      {children}
    </button>
  );
}

export default GrayButton;
