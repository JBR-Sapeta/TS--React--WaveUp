import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/store';

import { NotificationContext } from '@/context/NotificationContext';

import {
  UsersList,
  SearchField,
  Pagination,
  LoadingSpinner,
  NoResults,
} from '@/components';

import './SearchPage.css';
import { useSearchUsers } from '@/hooks';

function SearchPage() {
  const usersState = useAppSelector((state) => state.users);
  const [searchParams, setSearchParams] = useSearchParams();
  const notificationContext = useContext(NotificationContext);
  const { searchUsers } = useSearchUsers(notificationContext);

  const [nameQuery, setNameQuery] = useState<string>(
    () => searchParams.get('name') || ''
  );
  const [pageQuery, setPageQuery] = useState<number>(() =>
    Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 0
  );
  const [sizeQuery, setSizeQuery] = useState<number>(() =>
    Number(searchParams.get('size')) > 0 ? Number(searchParams.get('size')) : 10
  );

  const handleSearchField = (query: string) => {
    searchParams.set('name', query);
    searchParams.set('page', '0');
    setSearchParams(searchParams);
    setNameQuery(query);
    setPageQuery(0);
    searchUsers(query, 0, sizeQuery);
  };

  const handlePage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPageQuery(page);
    searchUsers(nameQuery, page, sizeQuery);
  };

  const handleSize = (size: number) => {
    searchParams.set('size', size.toString());
    searchParams.set('page', '0');
    setSearchParams(searchParams);
    setSizeQuery(size);
    setPageQuery(0);
    searchUsers(nameQuery, 0, size);
  };

  useEffect(() => {
    searchUsers(nameQuery, pageQuery, sizeQuery);
  }, []);

  const showBottomPagination =
    usersState.list.totalPages !== 0 &&
    usersState.list.data.length > 2 &&
    !usersState.isLoading;

  const showTopPagination =
    usersState.list.data.length !== 0 && !usersState.isLoading;

  const showNoResults =
    usersState.list.data.length === 0 && !usersState.isLoading;

  return (
    <section className="search">
      <SearchField onConfirm={handleSearchField} />

      {showTopPagination && (
        <div className="search__top-pagination">
          <Pagination
            pageSize={sizeQuery}
            currentPage={pageQuery}
            totalPages={usersState.list.totalPages}
            onSetPage={handlePage}
            onSetSize={handleSize}
            onlyIndicator
          />
        </div>
      )}

      {usersState.isLoading && (
        <div className="search__message">
          <LoadingSpinner />
        </div>
      )}

      {showNoResults && (
        <div className="search__message">
          <NoResults />
        </div>
      )}

      {!usersState.isLoading && <UsersList data={usersState.list.data} />}

      {showBottomPagination && (
        <div className="search__bottom-pagination">
          <Pagination
            pageSize={sizeQuery}
            currentPage={pageQuery}
            totalPages={usersState.list.totalPages}
            onSetPage={handlePage}
            onSetSize={handleSize}
          />
        </div>
      )}
    </section>
  );
}

export default SearchPage;
