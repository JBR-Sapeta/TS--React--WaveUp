import { useState, ChangeEvent, FormEvent, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '@/store';
import {
  AuthenticationResetAction,
  clearValidationError,
  resetValidationErrors,
} from '@/store/auth';
import { useChangePassword } from '@/hooks';

import { NotificationContext } from '@/context/NotificationContext';

import { BaseInput, BaseIcon, BlueButton, AuthHeader } from '@/components';

import './ProfileForm.css';

interface PasswordUpdateFormProps {
  closeModal: () => void;
}

function PasswordUpdateForm({ closeModal }: PasswordUpdateFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error: { validationErrors },
  } = useAppSelector((state) => state.auth);
  const notificationContext = useContext(NotificationContext);
  const { changePassword } = useChangePassword(notificationContext);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.password) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.PASSWORD })
      );
    }
    setPassword(event.target.value);
  };

  const newPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.password) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.NEW_PASSWORD })
      );
    }
    setNewPassword(event.target.value);
  };

  const confirmNewPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value);
  };

  const passwordMatch = newPassword === confirmNewPassword;

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    changePassword(password, newPassword, closeModal);
  };

  useEffect(() => {
    dispatch(resetValidationErrors());
  }, [dispatch]);

  return (
    <form className="profile-form" onSubmit={formHandler}>
      <AuthHeader isBlack>{t('header_change_password')}</AuthHeader>

      <div className="profile-form__inputs">
        <BaseInput
          isBlue
          type="password"
          placeholder={t('placeholder_new_password')}
          value={newPassword}
          onChange={newPasswordHandler}
          error={validationErrors?.newPassword || ''}
        >
          <BaseIcon name="MdLock" />
        </BaseInput>

        <BaseInput
          isBlue
          type="password"
          placeholder={t('placeholder_confirm')}
          value={confirmNewPassword}
          onChange={confirmNewPasswordHandler}
          error={passwordMatch ? '' : "Entered passwords don't match."}
        >
          <BaseIcon name="MdLock" />
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

      <BlueButton
        disabled={isLoading || !passwordMatch}
        isRounded
        type="submit"
      >
        {t('button_change')}
      </BlueButton>
    </form>
  );
}

export default PasswordUpdateForm;
