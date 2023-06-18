import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseInput, BaseIcon, BlueButton } from '@/components';

import { useAppDispatch } from '@/store';
import { clearValidationError } from '@/store/auth';
import { AuthenticationResetAction } from '@/store/types';

import { AuthenticationValidationErrors } from '@/store/types';

import "./AuthForm.css"
interface SignInFormProps {
  validationErrors?: AuthenticationValidationErrors;
  isLoading: boolean;
  formHandler: (email: string, password: string) => void;
}

function SignInForm({
  validationErrors,
  isLoading,
  formHandler,
}: SignInFormProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

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

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    formHandler(emailValue, passwordValue);
  };

  return (
    <form
      className="auth-form__form auth-form__form--center"
      onSubmit={onSubmit}
    >
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

      <div className="auth-form__button auth-form__button--60">
        <BlueButton disabled={isLoading} isRounded type="submit">
        {t("sign_in")}
        </BlueButton>
      </div>
    </form>
  );
}

export default SignInForm;
