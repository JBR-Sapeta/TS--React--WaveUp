import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/store';

import { NotificationContext } from '@/context/NotificationContext';

import { useGetUserPosts, usePagination } from '@/hooks';

import { Pagination, PostList, Skeleton } from '@/components';

import './UserPostList.css';

interface UserPostListProps {
  userId: number | undefined;
  username: string;
}

const userPostsAnimation = {
  initial: { y: 300 },
  animate: { y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};


function UserPostList({ userId, username }: UserPostListProps) {
  const { t } = useTranslation();
  const postsState = useAppSelector((state) => state.posts);
  const notificationContext = useContext(NotificationContext);
  const { getUserPosts } = useGetUserPosts(notificationContext);
  const { pageQuery, sizeQuery, changePageQuery, changeSizeQuery } =
    usePagination();

  const handlePage = (page: number) => {
    if (userId) {
      changePageQuery(page);
      getUserPosts(Number(userId), sizeQuery, page);
    }
  };

  const handleSize = (size: number) => {
    if (userId) {
      changeSizeQuery(size);
      changePageQuery(0);
      getUserPosts(Number(userId), size, 0);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserPosts(Number(userId), sizeQuery, pageQuery);
    }
  }, []);

  const showBottomPagination =
    postsState.list.totalPages !== 0 && postsState.list.data.length > 1;

  return (
    <>
      {userId && (
        <motion.div {...userPostsAnimation} className="posts__user">
          {postsState.list.data.length !== 0 ? (
            <>
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
            <div className="postst__message">
              {t('message_no_posts_user', { username: username })}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

export default UserPostList;
