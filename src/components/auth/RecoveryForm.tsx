import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseInput, BaseIcon, BlueButton } from '@/components';

import { useAppDispatch } from '@/store';
import { clearValidationError } from '@/store/auth';
import { AuthenticationResetAction } from '@/store/types';

import { AuthenticationValidationErrors } from '@/store/types';

import './AuthForm.css';

interface SignUpFormProps {
  validationErrors?: AuthenticationValidationErrors;
  isLoading: boolean;
  formHandler: (password: string) => void;
}

function RecoveryForm({
  validationErrors,
  isLoading,
  formHandler,
}: SignUpFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.password) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.PASSWORD })
      );
    }
    setPasswordValue(event.target.value);
  };

  const confirmPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordValue(event.target.value);
  };

  const passwordMatch = passwordValue === confirmPasswordValue;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    formHandler(passwordValue);
  };

  return (
    <form
      className="auth-form__form auth-form__form--center"
      onSubmit={onSubmit}
    >
      <BaseInput
        isBlue={false}
        type="text"
        placeholder={t('placeholder_new_password')}
        value={passwordValue}
        onChange={passwordHandler}
        error={validationErrors?.password || ''}
      >
        <BaseIcon name="MdLock" />
      </BaseInput>

      <BaseInput
        isBlue={false}
        type="text"
        placeholder={t('placeholder_confirm')}
        value={confirmPasswordValue}
        onChange={confirmPasswordHandler}
        error={passwordMatch ? '' : "Entered passwords don't match."}
      >
        <BaseIcon name="MdLock" />
      </BaseInput>

      <div className="auth-form__button auth-form__button--60">
        <BlueButton
          disabled={isLoading || !passwordMatch}
          isRounded
          type="submit"
        >
          {t('change')}
        </BlueButton>
      </div>
    </form>
  );
}

export default RecoveryForm;
