import './LoadingSpinner.css';

import spinnerImg from '@/assets/spinner.svg';

function LoadingSpinner() {
  return (
    <div className="spinner">
      <picture className="spinner__picture">
        <img className="spinner__img" src={spinnerImg} alt="Loading ..." />
        <div className="spinner__circle">
          <div className="spinner__arrow"></div>
        </div>
      </picture>
    </div>
  );
}

export default LoadingSpinner;
