import { LanguageChanger, BaseIcon } from '@/components';

import './RootNavigation.css';

interface RootNavigationProps {
  isOpen: boolean;
  toggelSidebar: () => void;
}

function RootNavigation({ isOpen, toggelSidebar }: RootNavigationProps) {
  return (
    <header className="navigation">
      <button
        className="navigation__button"
        type="button"
        onClick={toggelSidebar}
        aria-label='Navigation Button'
      >
        {!isOpen && <BaseIcon name="BiMenu" />}
        {isOpen && <BaseIcon name="RxCross2" />}
      </button>

      <div className="navigation__logo">
        <h1 className="navigation__header">WaveUp</h1>
      </div>

      <div className="navigation__language">
        <LanguageChanger />
      </div>
    </header>
  );
}

export default RootNavigation;
