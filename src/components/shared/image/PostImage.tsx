import classNames from 'classnames';

import handleImageError from '@/utils/handleImageError';

import defaultImage from '@/assets/image.png';

import './PostImage.css';

interface PostImageProps {
  src: string;
  size: 'flex' | '600px' | '300px';
  alt?: string;
}

function PostImage({ src, alt, size }: PostImageProps) {
  const imageClasses = classNames({
    'post-image__container--flex': size === 'flex',
    'post-image__container--600': size === '600px',
    'post-image__container--300': size === '300px',
  });

  let image;

  if (src && src.split(':')[0] === 'data') {
    image = src;
  } else {
    image = src
      ? `${import.meta.env.VITE_REACT_STATIC_URL}/posts/${src}`
      : defaultImage;
  }

  return (
    <div className={imageClasses}>
      <picture className="post-image__picture">
        <img
          className="post-image__img"
          src={image}
          alt={alt || 'User'}
          onError={handleImageError}
        />
      </picture>
    </div>
  );
}

export default PostImage;
