import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { NotificationContext } from '@/context/NotificationContext';

import { useBanUser, useUnbanUser } from '@/hooks';

import formattedDate from '@/utils/formattedDate';

import {
  BaseIcon,
  Modal,
  DropdownItem,
  DropdownMenu,
  Avatar,
  DeleteUserForm,
} from '@/components';

import './UserView.css';

interface UserViewProps {
  isModerator: boolean;
  id: number;
  accountName: string;
  username: string;
  avatar: string | null;
  description: string | null;
  birthday: string | null;
  city: string | null;
  hasBan: boolean;
}

const userViewAnimation = {
  initial: { x: 300  },
  animate: { x: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};


function UserView({
  isModerator,
  id,
  accountName,
  username,
  avatar,
  description,
  birthday,
  city,
  hasBan,
}: UserViewProps) {
  const { t } = useTranslation();
  const notificationContext = useContext(NotificationContext);
  const { banUser } = useBanUser(notificationContext);
  const { unbanUser } = useUnbanUser(notificationContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  let birthdayDate;

  if (birthday) {
    birthdayDate = formattedDate(birthday, 'Y-M-D');
  }

  return (
    <>
      <motion.article {...userViewAnimation} className="user-view">
        {isModerator && (
          <div className="user-view__dropdown">
            <DropdownMenu>
              <>
                <DropdownItem onClick={() => banUser(id)}>
                  <BaseIcon name="AiOutlineStop" />
                  {t('button_ban')}
                </DropdownItem>
                <DropdownItem onClick={() => unbanUser(id)}>
                  <BaseIcon name="AiOutlineCheckCircle" />
                  {t('button_unban')}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    openModal();
                  }}
                >
                  <BaseIcon name="MdDelete" />
                  {t('button_delete')}
                </DropdownItem>
              </>
            </DropdownMenu>
          </div>
        )}

        {hasBan && (
          <div className="user-view__ban">
            <BaseIcon name="BiErrorCircle" />
            <h3>{t('message_account_suspended')}</h3>
          </div>
        )}
        <div className="user-view__container">
          <div className="user-view__avatar">
            <Avatar isCircle size="300px" src={avatar || ''} />
          </div>
          <div className="user-view__about">
            <h2 className="user-view__username">{username}</h2>
            <p className="user-view__description">{description || '-'}</p>
            <div className="user-view__info">
              <p className="user-view__data">
                <BaseIcon name="FaUser" />
                <span>{t('placeholder_account_short')}:</span> {accountName}
              </p>
              <p className="user-view__data">
                <BaseIcon name="ImLocation" />
                <span>{t('placeholder_city')}:</span> {city || '-'}
              </p>
              <p className="user-view__data">
                <BaseIcon name="FaRegCalendarAlt" />
                <span>{t('placeholder_birthday')}:</span> {birthdayDate || '-'}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
      <div className="user-view__action"></div>

      {isModalOpen && (
        <Modal onClick={closeModal}>
          <DeleteUserForm userId={id} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default UserView;
