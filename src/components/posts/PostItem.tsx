import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FileData } from '@/store/types';

import {
  useDeletePost,
  useAddLike,
  useRemoveLike,
  useHidePost,
  useShowPost,
  useDeletePostAdmin,
} from '@/hooks';

import formattedDate from '@/utils/formattedDate';

import ROUTER_PATHS from '@/routes';

import {
  BaseIcon,
  DropdownItem,
  DropdownMenu,
  GrayButton,
  Avatar,
  PostImage,
  CommentList,
  UpdatePostForm,
} from '@/components';

import './PostItem.css';
import { NotificationContext } from '@/context/NotificationContext';
import { motion } from 'framer-motion';

interface PostItemProps {
  currentUserId: number;
  isAdmin: boolean;
  id: number;
  content: string;
  createdAt: string;
  file: FileData | null;
  isPublic: boolean;
  user: {
    id: number;
    accountName: string;
    username: string;
    avatar: null | string;
  };
  likes: Array<number>;
  comments: number;
}

const postAnimation = {
  initial: { opacity: 0.1 },
  animate: { opacity: 1 },
  transition: { duration: 0.35, ease: 'easeOut' },
};

function PostItem({
  currentUserId,
  isAdmin,
  id,
  content,
  createdAt,
  file,
  isPublic,
  user,
  likes,
  comments,
}: PostItemProps) {
  const { t } = useTranslation();
  const notificationContext = useContext(NotificationContext);
  const { deletePost } = useDeletePost(notificationContext);
  const { addLike } = useAddLike(notificationContext);
  const { removeLike } = useRemoveLike(notificationContext);
  const { showPost } = useShowPost(notificationContext);
  const { hidePost } = useHidePost(notificationContext);
  const { deletePostAdmin } = useDeletePostAdmin(notificationContext);
  const postRef = useRef<HTMLElement | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  let postDate;
  if (createdAt) {
    postDate = formattedDate(createdAt, 'Y-ML-D');
  }

  const postLiked = likes.includes(currentUserId);

  const likeHandler = () => {
    if (postLiked) {
      removeLike(id);
    } else {
      addLike(id);
    }
  };

  const closeCommentsList = () => {
    setShowComments(false);
    if (postRef.current) {
      postRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const canModerate = isAdmin && !(currentUserId === user.id);

  return (
    <motion.li {...postAnimation} className="post__item">
      {showForm ? (
        <article>
          <UpdatePostForm
            postId={id}
            username={user.username}
            avatar={user.avatar}
            content={content}
            file={file}
            createdAt={createdAt}
            closeForm={() => setShowForm(false)}
          />
        </article>
      ) : (
        <article ref={postRef}>
          <div className="post__header">
            <div className="post__user">
              <Link to={`${ROUTER_PATHS.search}/${user?.id}`}>
                <Avatar isCircle size="50px" src={user?.avatar || ''} />
              </Link>
              <div className="post__info">
                <Link to={`${ROUTER_PATHS.search}/${user?.id}`}>
                  <p className="post__name">{user?.username || ''}</p>
                </Link>
                <p className="post__date">{postDate}</p>
              </div>
            </div>
            {currentUserId === user.id && (
              <DropdownMenu>
                <DropdownItem onClick={() => setShowForm(true)}>
                  <BaseIcon name="MdModeEdit" />
                  {t('button_edit')}
                </DropdownItem>
                <DropdownItem onClick={() => deletePost(id)}>
                  <BaseIcon name="MdDelete" />
                  {t('button_delete')}
                </DropdownItem>
              </DropdownMenu>
            )}

            {canModerate && (
              <DropdownMenu>
                <DropdownItem onClick={() => hidePost(id)}>
                  <BaseIcon name="BiHide" />
                  {t('button_hide')}
                </DropdownItem>
                <DropdownItem onClick={() => showPost(id)}>
                  <BaseIcon name="BiShow" />
                  {t('button_show')}
                </DropdownItem>
                <DropdownItem onClick={() => deletePostAdmin(id)}>
                  <BaseIcon name="MdDelete" />
                  {t('button_delete')}
                </DropdownItem>
              </DropdownMenu>
            )}
          </div>

          <div className="post__content">
            {!isPublic && (
              <h3 className="post__hiden">
                <BaseIcon name="BiErrorCircle" />
                {t('message_post_hidden')}
              </h3>
            )}
            <p>{content}</p>
          </div>

          {file ? (
            <PostImage size="600px" src={file?.filename} />
          ) : (
            <hr className="post__hr" />
          )}

          <div className="post__actions">
            <GrayButton
              type="button"
              height="36px"
              hasRedIcon
              isRounded
              fixedWidth="160px"
              onClick={likeHandler}
            >
              {postLiked ? (
                <BaseIcon name="FaHeart" />
              ) : (
                <BaseIcon name="FaRegHeart" />
              )}

              {likes.length}
            </GrayButton>
            <GrayButton
              type="button"
              height="36px"
              isRounded
              fixedWidth="160px"
              onClick={() => setShowComments((state) => !state)}
            >
              <BaseIcon name="IoIosChatboxes" />
              {comments}
            </GrayButton>
          </div>
          {showComments && (
            <CommentList postId={id} closeList={closeCommentsList} />
          )}
        </article>
      )}
    </motion.li>
  );
}

export default PostItem;
