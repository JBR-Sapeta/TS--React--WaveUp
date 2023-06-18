import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import './Modal.css';

interface ModalWrapperProps {
  children: ReactNode;
}

function ModalWrapper({ children }: ModalWrapperProps) {
  return <div className="modal">{children}</div>;
}

interface ModalProps {

  children: ReactNode;
  onClick: () => void;
}
function Modal({  children, onClick }: ModalProps) {


  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById('backdrop')!
      )}
      {ReactDOM.createPortal(
        <ModalWrapper>{children}</ModalWrapper>,
        document.getElementById('modal')!
      )}
    </>
  );
}

export default Modal;
