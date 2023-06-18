import classNames from 'classnames';

import defaultImage from '@/assets/user.png';

import './Avatar.css';
import handleImageError from '@/utils/handleImageError';

interface AvatarProps {
  src: string | null;
  size: '300px' | '150px' | '50px' | '32px';
  alt?: string;
  isCircle?: boolean;
}

function Avatar({ src, alt, size, isCircle = false }: AvatarProps) {
  const avatarClasses = classNames({
    'avatar__container--300': size === '300px',
    'avatar__container--150': size === '150px',
    'avatar__container--50': size === '50px',
    'avatar__container--32': size === '32px',
    'avatar__container--circle': isCircle,
  });

  let image;

  if (src && src.split(':')[0] === 'data') {
    image = src;
  } else {
    image = src
      ? `${import.meta.env.VITE_REACT_STATIC_URL}/images/${src}`
      : defaultImage;
  }

  return (
    <div className={avatarClasses}>
      <picture className="avatar__avatar">
        <img
          className="avatar__image"
          src={image}
          alt={alt || 'User'}
          onError={handleImageError}
        />
      </picture>
    </div>
  );
}

export default Avatar;
