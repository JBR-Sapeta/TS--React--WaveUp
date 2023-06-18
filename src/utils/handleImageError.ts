import { SyntheticEvent } from 'react';
import defaultImage from '@/assets/image.png';

const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  img.src = defaultImage;
};

export default handleImageError;
