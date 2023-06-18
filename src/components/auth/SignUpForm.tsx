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
  formHandler: (accountName: string, email: string, password: string) => void;
}

function SignUpForm({
  validationErrors,
  isLoading,
  formHandler,
}: SignUpFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [accountValue, setAccountValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');

  const accountHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.accountName) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.ACCOUNT_NAME })
      );
    }
    setAccountValue(event.target.value);
  };

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.email) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.EMAIL })
      );
    }
    setEmailValue(event.target.value);
  };

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
    formHandler(accountValue, emailValue, passwordValue);
  };

  return (
    <form className="auth-form__form" onSubmit={onSubmit}>
      <BaseInput
        isBlue={false}
        type="text"
        placeholder={t("placeholder_account")}
        value={accountValue}
        onChange={accountHandler}
        error={validationErrors?.accountName || ''}
      >
        <BaseIcon name="FaUserAlt" />
      </BaseInput>

      <BaseInput
        isBlue={false}
        type="text"
        placeholder={t("placeholder_email")}
        value={emailValue}
        onChange={emailHandler}
        error={validationErrors?.email || ''}
      >
        <BaseIcon name="MdEmail" />
      </BaseInput>

      <BaseInput
        isBlue={false}
        type="password"
        placeholder={t("placeholder_password")}
        value={passwordValue}
        onChange={passwordHandler}
        error={validationErrors?.password || ''}
      >
        <BaseIcon name="MdLock" />
      </BaseInput>

      <BaseInput
        isBlue={false}
        type="password"
        placeholder={t("placeholder_confirm")}
        value={confirmPasswordValue}
        onChange={confirmPasswordHandler}
        error={passwordMatch ? '' : `${t('message_password_mismatch')}`}
      >
        <BaseIcon name="MdLock" />
      </BaseInput>
      <div className="auth-form__button">
        <BlueButton
          disabled={isLoading || !passwordMatch}
          isRounded
          type="submit"
        >
          {t("sign_up")}
        </BlueButton>
      </div>
    </form>
  );
}

export default SignUpForm;
