import { ReactNode } from 'react';

import './DropdownItem.css';

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => object | void;
}

function DropdownItem({ children, onClick }: DropdownItemProps) {
  return (
    <button type="button" className="dropdown-item" onClick={onClick}>
      {children}
    </button>
  );
}

export default DropdownItem;
