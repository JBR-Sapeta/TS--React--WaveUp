import { ReactNode } from 'react';

import SidebraMenu from '../sidebar/SidebarMenu';

import './RootMain.css';

interface RootMainProps {
  isOpen: boolean;
  toggelSidebar: () => void;
  children: ReactNode;
}

function RootMain({ children, isOpen, toggelSidebar }: RootMainProps) {
  return (
    <main className="root-main">
      <div className="root-main__sidebar">
        {isOpen && <SidebraMenu toggelSidebar={toggelSidebar} />}
      </div>
      <div className="root-main__content">{children}</div>
    </main>
  );
}

export default RootMain;
