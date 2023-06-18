import { useState} from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageQuery, setPageQuery] = useState<number>(() =>
    Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 0
  );
  const [sizeQuery, setSizeQuery] = useState<number>(() =>
    Number(searchParams.get('size')) > 0 ? Number(searchParams.get('size')) : 10
  );

  const changePageQuery = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPageQuery(page);
  };

  const changeSizeQuery = (size: number) => {
    searchParams.set('size', size.toString());
    searchParams.set('page', '0');
    setSearchParams(searchParams);
    setSizeQuery(size);
    setPageQuery(0);
  };

  return { pageQuery, sizeQuery, changePageQuery, changeSizeQuery };
};

export default usePagination;
