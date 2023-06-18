import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownItem } from '@/components';

import './Pagination .css';

interface PaginationProps {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onSetPage: (number: number) => void;
  onSetSize: (number: number) => void;
  onlyIndicator?: boolean;
}

function Pagination({
  pageSize,
  currentPage,
  totalPages,
  onSetPage,
  onSetSize,
  onlyIndicator = false,
}: PaginationProps) {
  const { t } = useTranslation();
  const cahngePage = (page: number) => {
    onSetPage(currentPage + page);
    window.scrollTo(0, 0);
  };

  const showPreviousPage = currentPage <= 0 ? false : true;
  const showNextPage = currentPage + 1 >= totalPages ? false : true;

  return (
    <div className={`pagination ${onlyIndicator && 'pagination--indicator'}`}>
      {!onlyIndicator && (
        <div className="pagination__page-indicator">{`
      ${t('placeholder_page')}: 
      ${currentPage + 1}/${totalPages || 1}`}</div>
      )}

      <div className="pagination__buttons">
        {showPreviousPage && (
          <button
            type="button"
            className="pagination__button"
            onClick={() => {
              cahngePage(-1);
            }}
          >
            {currentPage}
          </button>
        )}

        <button
          type="button"
          className="pagination__button pagination__button--active"
        >
          {currentPage + 1}
        </button>

        {showNextPage && (
          <button
            type="button"
            className="pagination__button"
            onClick={() => {
              cahngePage(1);
            }}
          >
            {currentPage + 2}
          </button>
        )}
      </div>

      {!onlyIndicator && (
        <div className="pagination__page-size">
          <label>{t('placeholder_size')}:</label>
          <div className="pagination__size-indicator">
            <p>{pageSize}</p>
            <DropdownMenu icon="TiArrowSortedDown">
              <DropdownItem onClick={() => onSetSize(10)}>10</DropdownItem>
              <DropdownItem onClick={() => onSetSize(25)}>25</DropdownItem>
              <DropdownItem onClick={() => onSetSize(50)}>50</DropdownItem>
              <DropdownItem onClick={() => onSetSize(100)}>100</DropdownItem>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
