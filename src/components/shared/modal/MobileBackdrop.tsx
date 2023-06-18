import ReactDOM from 'react-dom';

import './MobileBackdrop.css';

function MobileBackdrop() {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="mobile-backdrop"></div>,
        document.getElementById('backdrop')!
      )}
    </>
  );
}

export default MobileBackdrop;
