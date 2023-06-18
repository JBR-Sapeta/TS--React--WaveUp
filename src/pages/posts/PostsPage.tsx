import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store';
import getPosts from '@/store/posts/thunks/getPosts';

import { NotificationContext } from '@/context/NotificationContext';

import { DateQuery } from '@/store/types';

import {
  GrayButton,
  BaseIcon,
  PostList,
  Pagination,
  Skeleton,
} from '@/components';

import './PostPage.css';

function PostsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const postsState = useAppSelector((state) => state.posts);
  const notificationContext = useContext(NotificationContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [dateQuery, setDateQuery] = useState<DateQuery>(
    () => (searchParams.get('date') as DateQuery) || 'today'
  );
  const [pageQuery, setPageQuery] = useState<number>(() =>
    Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 0
  );
  const [sizeQuery, setSizeQuery] = useState<number>(() =>
    Number(searchParams.get('size')) > 0 ? Number(searchParams.get('size')) : 10
  );

  const sendRequest = (date: DateQuery, page: number, size: number) => {
    const data = { date, page, size };
    dispatch(getPosts(data))
      .unwrap()
      .catch((err) => {
        notificationContext.showNotification({
          isLoading: false,
          status: err.status,
          message: err.message,
        });
      });
  };

  const handleDate = (query: DateQuery) => {
    searchParams.set('date', query);
    searchParams.set('page', '0');
    setSearchParams(searchParams);
    setDateQuery(query);
    setPageQuery(0);
    sendRequest(query, 0, sizeQuery);
  };

  const handlePage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPageQuery(page);
    sendRequest(dateQuery, page, sizeQuery);
  };

  const handleSize = (size: number) => {
    searchParams.set('size', size.toString());
    searchParams.set('page', '0');
    setSearchParams(searchParams);
    setSizeQuery(size);
    setPageQuery(0);
    sendRequest(dateQuery, 0, size);
  };

  useEffect(() => {
    sendRequest(dateQuery, pageQuery, sizeQuery);
  }, []);

  const showBottomPagination =
    postsState.list.totalPages !== 0 &&
    postsState.list.data.length > 1 &&
    !postsState.isLoading;

  const showTopPagination = postsState.list.totalPages !== 0;

  return (
    <section className="posts">
      <div className="posts__filters">
        <GrayButton
          type="button"
          fixedWidth="160px"
          isRounded
          isActive={dateQuery === 'today'}
          onClick={() => handleDate('today')}
        >
          <BaseIcon name="AiOutlineClockCircle" />
          {t('button_today')}
        </GrayButton>
        <GrayButton
          type="button"
          fixedWidth="160px"
          isRounded
          isActive={dateQuery === 'week'}
          onClick={() => handleDate('week')}
        >
          <BaseIcon name="MdOutlineCalendarMonth" />
          {t('button_week')}
        </GrayButton>
        <GrayButton
          type="button"
          fixedWidth="160px"
          isRounded
          isActive={dateQuery === 'older'}
          onClick={() => handleDate('older')}
        >
          <BaseIcon name="IoIosInfinite" />
          {t('button_older')}
        </GrayButton>
      </div>

      {showTopPagination && (
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
          />
        </div>
      )}
    </section>
  );
}

export default PostsPage;
