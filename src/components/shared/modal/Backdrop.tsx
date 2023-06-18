import { ReactNode } from 'react';

import './Backdrop.css';

interface BackdropProps {
  onClick: () => void;
}

function Backdrop({ onClick }: BackdropProps) {
  return <div className="backdrop" onClick={onClick}></div>;
}

export default Backdrop;
