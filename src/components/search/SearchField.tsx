import { useState, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { BaseIcon } from '@/components';

import './SearchField.css';

interface SearchFieldProps {
  onConfirm: (query: string) => void;
}

function SearchField({ onConfirm }: SearchFieldProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const onSearchConfirm = () => {
    onConfirm(query);
  };

  const submitByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onConfirm(query);
    }
  };

  const filedClasses = classNames('search__field', {
    'search__field--focused': isFocused,
  });

  return (
    <div className={filedClasses}>
      <input
        className="search__input"
        type="text"
        placeholder={t('placeholder_search') as string}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={submitByEnter}
      />
      <div className="search_action">
        <button
          className="search__button"
          type="button"
          onClick={onSearchConfirm}
        >
          <BaseIcon name="IoMdSearch" />
          <span>{t('button_search')}</span>
        </button>
      </div>
    </div>
  );
}

export default SearchField;
