import { ReactNode, useState , ChangeEvent } from 'react';

import className from 'classnames';

import './BaseInput.css';

interface BaseInputProps {
  type: string;
  placeholder: string;
  value: string;
  error: string;
  children: ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isBlue: boolean;
  label?: string;
  id?: string;
}

function BaseInput({
  children,
  type,
  placeholder,
  value,
  onChange,
  isBlue = false,
  label = '',
  id = '',
  error,
}: BaseInputProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const inputField = className('base-input__field', {
    'base-input__field--blue': isBlue,
    'base-input__field--error ': error && !isBlue,
    'base-input__field--green ': focused && !isBlue,
    'base-input__field--error-dark ': error && isBlue,
    'base-input__field--green-dark ': focused && isBlue,
  });

  const errorMesage = className('base-input__error', {
    'base-input__error--active ': error,
  });

  const idObject = id ? {id:id} :{};

  return (
    <div role="button" className="base-input__container">
      <div className={inputField}>
        {label && (
          <label className="base-input__label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          {...idObject}
          type={type}
          placeholder={placeholder}
          className="base-input__input"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {children}
      </div>
      <div className={errorMesage}>
        <p>{error} </p>
      </div>
    </div>
  );
}

export default BaseInput;

// #E11B1B
// #D80027;
// Entered email is not valid.
