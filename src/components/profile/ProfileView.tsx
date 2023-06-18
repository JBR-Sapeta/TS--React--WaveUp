import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import formattedDate from '@/utils/formattedDate';

import {
  BaseIcon,
  Modal,
  DropdownItem,
  DropdownMenu,
  Avatar,
  PasswordUpdateForm,
  EmailUpdateForm,
  DeleteAccountForm,
} from '@/components';

import './ProfileView.css';

interface ProfilePreviewProps {
  openEditMode: () => void;
  id: number;
  accountName: string;
  username: string;
  avatar: string | null;
  description: string | null;
  birthday: string | null;
  city: string | null;
  email: string;
}

interface ModalObjcet {
  password: boolean;
  email: boolean;
  delete: boolean;
}

const profileViewAnimation = {
  initial: { x: 300  },
  animate: { x: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function ProfilePreview({
  openEditMode,
  accountName,
  username,
  avatar,
  description,
  birthday,
  city,
  email = '',
}: ProfilePreviewProps) {
  const modalObject = {
    password: false,
    email: false,
    delete: false,
  } as ModalObjcet;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<ModalObjcet>(modalObject);

  const openModal = (field: 'password' | 'email' | 'delete') => {
    setIsModalOpen((state) => {
      return { ...state, [field]: true };
    });
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsModalOpen(modalObject);
    document.body.style.overflow = 'unset';
  };

  let birthdayDate;

  if (birthday) {
    birthdayDate = formattedDate(birthday, 'Y-M-D');
  }

  return (
    <>
      <motion.article {...profileViewAnimation} className="user-profile">
        <div className="user-profile__dropdown">
          <DropdownMenu>
            <>
              <DropdownItem onClick={openEditMode}>
                <BaseIcon name="MdModeEdit" />
                {t('button_edit')}
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  openModal('password');
                }}
              >
                <BaseIcon name="MdLock" />
                {t('button_password')}
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  openModal('email');
                }}
              >
                <BaseIcon name="MdEmail" />
                {t('button_email')}
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  openModal('delete');
                }}
              >
                <BaseIcon name="MdDelete" />
                {t('button_delete')}
              </DropdownItem>
            </>
          </DropdownMenu>
        </div>

        <div className="user-profile__container">
          <div className="user-profile__avatar">
            <Avatar isCircle size="300px" src={avatar} />
          </div>
          <div className="user-profile__about">
            <h2 className="user-profile__username">{username}</h2>
            <p className="user-profile__description">{description || '-'}</p>
          </div>
        </div>

        <div className="user-profile__info">
          <p className="user-profile__data">
            <BaseIcon name="FaUser" />
            <span>{t('placeholder_account_short')}:</span> {accountName}
          </p>
          <p className="user-profile__data">
            <BaseIcon name="ImLocation" />
            <span>{t('placeholder_city')}:</span> {city || '-'}
          </p>
          <p className="user-profile__data">
            <BaseIcon name="FaRegCalendarAlt" />
            <span>{t('placeholder_birthday')}:</span> {birthdayDate || '-'}
          </p>
          <p className="user-profile__data">
            <BaseIcon name="MdEmail" />
            <span>{t('placeholder_email_short')}:</span> {email}
          </p>
        </div>
      </motion.article>

      {isModalOpen.password && (
        <Modal onClick={closeModal}>
          <PasswordUpdateForm closeModal={closeModal} />
        </Modal>
      )}

      {isModalOpen.email && (
        <Modal onClick={closeModal}>
          <EmailUpdateForm closeModal={closeModal} />
        </Modal>
      )}

      {isModalOpen.delete && (
        <Modal onClick={closeModal}>
          <DeleteAccountForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default ProfilePreview;
