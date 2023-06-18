import { useState, FormEvent, ChangeEvent, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { AuthenticationValidationErrors } from '@/store/types';
import { resetValidationErrors } from '@/store/auth';

import { NotificationContext } from '@/context/NotificationContext';

import { useUpdateAccount } from '@/hooks';

import { BaseInput, BaseIcon, Avatar, GrayButton } from '@/components';

import convertToBase64 from '@/utils/convertToBase64';

import './EditeProfileForm.css';

interface EditeProfileFormProps {
  closeEditMode: () => void;
  username: string;
  avatar: string | null;
  description: string | null;
  birthday: string | null;
  city: string | null;
  errors?: AuthenticationValidationErrors;
}

const editProfileAnimation = {
  initial: { x: -300 },
  animate: { x: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function EditeProfileForm({
  closeEditMode,
  username,
  avatar,
  description,
  birthday,
  city,
  errors = {},
}: EditeProfileFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.data);
  const langState = useAppSelector((state) => state.lang);
  const notificationContext = useContext(NotificationContext);
  const { updateAccount } = useUpdateAccount(notificationContext);
  const [usernameValue, setUsernameValue] = useState<string>(() => username);
  const [cityValue, setCityValue] = useState<string>(() => city || '');
  const [birthdayValue, setBirthdayValue] = useState<string>(() =>
    birthday ? birthday.split('T')[0] : ''
  );
  const [descriptionValue, setDescriptionValue] = useState<string>(
    () => description || ''
  );
  const [imageValue, setImageValue] = useState<string>(avatar || '');

  const [textareaFocused, setTextareaFocused] = useState<boolean>(false);
  const onTextareaFocused = () => {
    setTextareaFocused(true);
  };
  const onTextareaBlur = () => {
    setTextareaFocused(false);
  };

  const usernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };

  const cityHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCityValue(event.target.value);
  };
  const birthdayHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBirthdayValue(event.target.value);
  };

  const descriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    let file, base64;
    if (event.currentTarget.files) {
      file = event.currentTarget.files[0];
      base64 = await convertToBase64(file);
      if (typeof base64 === 'string') {
        setImageValue(base64);
      }
    }
  };

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    let birthday;
    try {
      birthday = new Date(birthdayValue).toISOString();
    } catch {}
    const image = imageValue === authState.avatar ? null : imageValue;
    const imageAsBase64 = image?.split(',')[1];

    const data = {
      id: authState.id,
      username: usernameValue,
      image: imageAsBase64 || null,
      description: descriptionValue || null,
      birthday: birthday || null,
      city: cityValue || null,
      token: authState.token,
      language: langState.lang,
    };
    updateAccount(data, closeEditMode);
  };

  const imageError = classNames('account-form__error', {
    'account-form__error--active': errors.image,
  });
  const descriptionError = classNames('account-form__error', {
    'account-form__error--active': errors.description,
  });

  useEffect(() => {
    dispatch(resetValidationErrors());
  }, [dispatch]);

  return (
    <motion.form {...editProfileAnimation} className="account-form" onSubmit={formHandler}>
      <div className="account-form__inputs">
        <div className="account-form__image-prewiev">
          <Avatar size="300px" src={imageValue} />
          <div className="account-form__image">
            <label htmlFor="image">
              <BaseIcon name="MdCloudUpload" />
              {t('button_upload')}
            </label>
            <input id="image" type="file" onChange={fileHandler} />
            <p className={imageError}>{errors?.image || ''}</p>
          </div>
        </div>
        <div className="account-form__info">
          <BaseInput
            isBlue
            type="text"
            placeholder={t('placeholder_username')}
            onChange={usernameHandler}
            value={usernameValue}
            error={errors.username || ''}
            label={t('placeholder_username') as string}
            id="username"
          >
            <BaseIcon name="FaUser" />
          </BaseInput>

          <BaseInput
            isBlue
            type="text"
            placeholder={t('placeholder_city')}
            onChange={cityHandler}
            value={cityValue}
            error={errors.city || ''}
            label={t('placeholder_city') as string}
            id="city"
          >
            <BaseIcon name="ImLocation" />
          </BaseInput>

          <div className="account-form__date">
            <label
              htmlFor="date"
              className={textareaFocused ? 'account-form__label--focues' : ''}
            >
              <BaseIcon name="FaRegCalendarAlt" />
              {t('placeholder_birthday')}
            </label>
            <input
              id="date"
              type="date"
              value={birthdayValue}
              onChange={birthdayHandler}
              onFocus={onTextareaFocused}
              onBlur={onTextareaBlur}
            />
          </div>
        </div>
      </div>

      <div className="account-form__textarea">
        <label htmlFor="">{t('placeholder_description')}</label>
        <textarea
          value={descriptionValue}
          maxLength={600}
          onChange={descriptionHandler}
        />
        <p className={descriptionError}>{errors?.description || ''}</p>
      </div>

      <div className="account-form__actions">
        <GrayButton isRed type="button" onClick={closeEditMode}>
          <BaseIcon name="MdClose" />
          {t('button_close')}
        </GrayButton>
        <GrayButton type="submit">
          <BaseIcon name="MdOutlineSaveAlt" />
          {t('button_save')}
        </GrayButton>
      </div>
    </motion.form>
  );
}

export default EditeProfileForm;
