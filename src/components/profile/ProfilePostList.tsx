import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import { motion } from 'framer-motion';

import { NotificationContext } from '@/context/NotificationContext';

import { useGetUserPosts, usePagination } from '@/hooks';

import { Pagination, PostList, Skeleton } from '@/components';

import './ProfilePostList.css';

interface ProfilePostListProps {
  userId: number;
}

const profilePostsAnimation = {
  initial: { y: 300 },
  animate: { y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function ProfilePostList({ userId }: ProfilePostListProps) {
  const { t } = useTranslation();
  const postsState = useAppSelector((state) => state.posts);
  const notificationContext = useContext(NotificationContext);
  const { getUserPosts } = useGetUserPosts(notificationContext);
  const { pageQuery, sizeQuery, changePageQuery, changeSizeQuery } =
    usePagination();

  const handlePage = (page: number) => {
    changePageQuery(page);
    getUserPosts(userId, sizeQuery, page);
  };

  const handleSize = (size: number) => {
    changeSizeQuery(size);
    changePageQuery(0);
    getUserPosts(userId, size, 0);
  };

  useEffect(() => {
    getUserPosts(userId, sizeQuery, pageQuery);
  }, []);

  const showBottomPagination =
    postsState.list.totalPages !== 0 && postsState.list.data.length > 1;

  return (
    <motion.div {...profilePostsAnimation} className="posts__profile">
      {postsState.list.data.length !== 0 ? (
        <>
          {!postsState.isLoading && (
            <div className="posts__top-pagination">
              <Pagination
                pageSize={sizeQuery}
                currentPage={pageQuery}
                totalPages={postsState.list.totalPages}
                onSetPage={handlePage}
                onSetSize={handleSize}
                onlyIndicator
              />
            </div>
          )}

          {postsState.isLoading && <Skeleton type="Posts" />}

          {!postsState.isLoading && (
            <PostList
              data={postsState.list.data}
              isLoading={postsState.isLoading}
            />
          )}

          {showBottomPagination && (
            <div className="posts__bottom-pagination">
              <Pagination
                pageSize={sizeQuery}
                currentPage={pageQuery}
                totalPages={postsState.list.totalPages}
                onSetPage={handlePage}
                onSetSize={handleSize}
                onlyIndicator
              />
            </div>
          )}
        </>
      ) : (
        <div className="postst__message">{t('message_no_posts')}</div>
      )}
    </motion.div>
  );
}

export default ProfilePostList;
