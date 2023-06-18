/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';

import classNames from 'classnames';

import './BlueButton.css';

interface BlueButtonProps {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isRounded?: boolean;
  onClick?: () => void;
}

function BlueButton({
  children,
  type,
  disabled = false,
  isRounded = false,
  onClick,
}: BlueButtonProps) {
  const buttonClasses = classNames('blue-button', {
    'blue-button--rounded': isRounded,
    'blue-button--disabled': disabled,
  });

  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BlueButton;
