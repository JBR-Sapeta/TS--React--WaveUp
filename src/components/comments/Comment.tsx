import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CommentData } from '@/store/types';

import { NotificationContext } from '@/context/NotificationContext';

import { useResteComment, useDeleteComment } from '@/hooks';

import formattedDate from '@/utils/formattedDate';

import ROUTER_PATHS from '@/routes';

import {
  Avatar,
  BaseIcon,
  DropdownMenu,
  DropdownItem,
  CommentForm,
} from '@/components';

import './Comment.css';
import { motion } from 'framer-motion';

interface CommentListProps extends CommentData {
  postId: number;
  currentUserId: number;
  isAdmin: boolean;
}

const commentAnimation = {
  initial: { scale: 0.4  },
  animate: { scale: 1 },
  transition: { duration: 0.2, ease: 'easeOut' },
};


function Comment({
  isAdmin,
  currentUserId,
  postId,
  id,
  content,
  createdAt,
  user,
}: CommentListProps) {
  const { t } = useTranslation();
  const notificationContext = useContext(NotificationContext);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { resetComment } = useResteComment(notificationContext);
  const { deleteComment } = useDeleteComment(notificationContext);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const date = formattedDate(createdAt, 'Y-M-D-H-M');

  const canModerate = isAdmin && !(currentUserId === user.id);

  return (
    <motion.li {...commentAnimation} >
      {isFormOpen ? (
        <CommentForm
          postId={postId}
          commentId={id}
          content={content}
          closeForm={closeForm}
        />
      ) : (
        <article className="comment">
          <div className="comment_header">
            <div className="comment_user">
              <Link to={`${ROUTER_PATHS.search}/${user.id}`}>
                <Avatar
                  isCircle
                  size="32px"
                  src={user.avatar || ''}
                  alt="User"
                />
              </Link>

              <div className="comment_info">
                <Link to={`${ROUTER_PATHS.search}/${user.id}`}>
                  <p className="comment_name">{user.username}</p>
                </Link>
                <p className="comment_date">{date}</p>
              </div>
            </div>
            {currentUserId === user.id && (
              <DropdownMenu>
                <DropdownItem onClick={openForm}>
                  <BaseIcon name="MdModeEdit" />
                  {t('button_edit')}
                </DropdownItem>
                <DropdownItem onClick={() => deleteComment(id, postId)}>
                  <BaseIcon name="MdDelete" />
                  {t('button_delete')}
                </DropdownItem>
              </DropdownMenu>
            )}

            {canModerate && (
              <DropdownMenu>
                <DropdownItem onClick={() => resetComment(id, postId)}>
                  <BaseIcon name="RiToolsFill" />
                  {t('button_moderate')}
                </DropdownItem>
              </DropdownMenu>
            )}
          </div>
          <div className="comment_content">
            <p>{content}</p>
          </div>
        </article>
      )}
    </motion.li>
  );
}

export default Comment;
