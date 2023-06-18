import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '@/store';
import {
  AuthenticationResetAction,
  clearValidationError,
  resetValidationErrors,
} from '@/store/auth';

import { NotificationContext } from '@/context/NotificationContext';

import { BaseInput, BaseIcon, BlueButton, AuthHeader } from '@/components';

import { useChangeEmail } from '@/hooks';

import './ProfileForm.css';

interface PasswordUpdateFormProps {
  closeModal: () => void;
}

function EmailUpdateForm({ closeModal }: PasswordUpdateFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error: { validationErrors },
  } = useAppSelector((state) => state.auth);
  const notificationContext = useContext(NotificationContext);
  const { changeEmail } = useChangeEmail(notificationContext);
  const [password, setPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.password) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.PASSWORD })
      );
    }
    setPassword(event.target.value);
  };

  const newEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.password) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.NEW_EMAIL })
      );
    }
    setNewEmail(event.target.value);
  };

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    changeEmail(password, newEmail, closeModal);
  };

  useEffect(() => {
    dispatch(resetValidationErrors());
  }, [dispatch]);

  return (
    <form className="profile-form" onSubmit={formHandler}>
      <AuthHeader isBlack>{t('header_change_email')}</AuthHeader>

      <div className="profile-form__inputs">
        <BaseInput
          isBlue
          type="text"
          placeholder={t('placeholder_new_email')}
          value={newEmail}
          onChange={newEmailHandler}
          error={validationErrors?.newEmail || ''}
        >
          <BaseIcon name="MdEmail" />
        </BaseInput>

        <BaseInput
          isBlue
          type="password"
          placeholder={t('placeholder_current_password')}
          value={password}
          onChange={passwordHandler}
          error={validationErrors?.password || ''}
        >
          <BaseIcon name="MdLock" />
        </BaseInput>
      </div>

      <BlueButton disabled={isLoading} isRounded type="submit">
      {t('button_change')}
      </BlueButton>
    </form>
  );
}

export default EmailUpdateForm;
