import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseInput, BaseIcon, BlueButton } from '@/components';

import { useAppDispatch } from '@/store';
import { clearValidationError } from '@/store/auth';
import { AuthenticationResetAction } from '@/store/types';

import { AuthenticationValidationErrors } from '@/store/types';

import "./AuthForm.css"

interface SignUpFormProps {
  validationErrors?: AuthenticationValidationErrors;
  isLoading: boolean;
  formHandler: (email: string) => void;
}

function ResetForm({
  validationErrors,
  isLoading,
  formHandler,
}: SignUpFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [emailValue, setEmailValue] = useState<string>('');

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.email) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.EMAIL })
      );
    }
    setEmailValue(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    formHandler(emailValue);
  };

  return (
    <form
      className="auth-form__form auth-form__form--center"
      onSubmit={onSubmit}
    >
      <BaseInput
        isBlue={false}
        type="text"
        placeholder={t('placeholder_email')}
        value={emailValue}
        onChange={emailHandler}
        error={validationErrors?.email || ''}
      >
        <BaseIcon name="MdEmail" />
      </BaseInput>
      <div className="auth-form__info">
        <p>
        {t('reset_message')}
        </p>
      </div>

      <div className="auth-form__button">
        <BlueButton disabled={isLoading} isRounded type="submit">
          {t('reset')}
        </BlueButton>
      </div>
    </form>
  );
}

export default ResetForm;
