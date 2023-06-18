import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import formattedDate from '@/utils/formattedDate';

import { UserPreviewData } from '@/store/types';

import { BaseIcon, Avatar } from '@/components';

import ROUTER_PATHS from '@/routes';

import './UserPreview.css';

const userPreviewAnimation = {
  initial: { scale: 0.5, opacity: 0, y: 300 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function UserPreview({
  id,
  accountName,
  username,
  avatar,
  birthday,
  city,
}: UserPreviewData) {
  const { t } = useTranslation();
  let birthdayDate;

  if (birthday) {
    birthdayDate = formattedDate(birthday, 'Y-M-D');
  }

  return (
    <motion.li {...userPreviewAnimation} className="user-lis-item">
      <Link to={`${ROUTER_PATHS.search}/${id}`}>
        <article className="user-previev">
          <div className="user-previev__avatar">
            <Avatar size="150px" src={avatar || ''} />
          </div>

          <div className="user-previev__content">
            <h2>{username}</h2>
            <p className="user-previev__data">
              <BaseIcon name="FaUser" />
              <span>{t('placeholder_account_short')}:</span> {accountName}
            </p>

            <p className="user-previev__data">
              <BaseIcon name="ImLocation" />
              <span>{t('placeholder_city')}:</span> {city || '-'}
            </p>

            <p className="user-previev__data">
              <BaseIcon name="FaRegCalendarAlt" />
              <span>{t('placeholder_birthday')}:</span>
              {birthdayDate || '-'}
            </p>
          </div>
        </article>
      </Link>
    </motion.li>
  );
}

export default UserPreview;
