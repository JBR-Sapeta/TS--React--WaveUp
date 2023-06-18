/* eslint-disable react/require-default-props */
import { ReactNode, useState, useEffect, useRef } from 'react';

import BaseIcon from '../icons/BaseIcon';

import './DropdownMenu.css';

interface DropdownMenuProps {
  children: ReactNode;
  label?: string;
  icon?: string;
}

function DropdownMenu({
  children,
  icon = 'TbDotsVertical',
  label = '',
}: DropdownMenuProps) {
  const dropdownElement = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = (event: globalThis.MouseEvent): void => {
      if (!dropdownElement.current) {
        return;
      }

      if (!dropdownElement.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [setIsOpen]);

  return (
    <div className={`dropdown ${isOpen ? 'dropdown-active' : ''}`}>
      <button
        ref={dropdownElement}
        className="dropdown__button"
        type="button"
        aria-label="Menu button"
        onClick={() => setIsOpen((state) => !state)}
      >
        {label}
        <BaseIcon name={icon} />
      </button>
      {isOpen && <div className="dropdown__list">{children}</div>}
    </div>
  );
}

export default DropdownMenu;
