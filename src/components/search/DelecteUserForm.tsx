import { useState, ChangeEvent, FormEvent, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from '@/store';
import {
  AuthenticationResetAction,
  clearValidationError,
  resetValidationErrors,
} from '@/store/auth';

import { NotificationContext } from '@/context/NotificationContext';

import { useDeleteUser } from '@/hooks';

import { BaseInput, BaseIcon, BlueButton, AuthHeader } from '@/components';

import './DeleteUserForm.css';

interface DeleteUserFormProps {
  closeModal: () => void;
  userId: number;
}

function DeleteUserForm({ closeModal, userId }: DeleteUserFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error: { validationErrors },
  } = useAppSelector((state) => state.auth);
  const notificationContext = useContext(NotificationContext);
  const { deleteUser } = useDeleteUser(notificationContext);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (validationErrors?.password) {
      dispatch(
        clearValidationError({ field: AuthenticationResetAction.PASSWORD })
      );
    }
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const passwordMatch = password === confirmPassword;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    deleteUser(userId, password, closeModal);
  };

  useEffect(() => {
    dispatch(resetValidationErrors());
  }, [dispatch]);

  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <AuthHeader isBlack>{t('header_delete_account')}</AuthHeader>

      <div className="profile-form__inputs">
        <BaseInput
          isBlue
          type="password"
          placeholder={t('placeholder_password')}
          value={password}
          onChange={passwordHandler}
          error={validationErrors?.password || ''}
        >
          <BaseIcon name="MdLock" />
        </BaseInput>

        <BaseInput
          isBlue
          type="password"
          placeholder={t('placeholder_confirm')}
          value={confirmPassword}
          onChange={confirmPasswordHandler}
          error={passwordMatch ? '' : `${t('message_password_mismatch')}`}
        >
          <BaseIcon name="MdLock" />
        </BaseInput>
      </div>

      <BlueButton
        disabled={isLoading || !passwordMatch}
        isRounded
        type="submit"
      >
        {t('button_delete')}
      </BlueButton>
    </form>
  );
}

export default DeleteUserForm;
