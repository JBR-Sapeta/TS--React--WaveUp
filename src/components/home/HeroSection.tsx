/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ROUTER_PATHS from '@/routes';

import './HeroSection.css';
import { useTranslation } from 'react-i18next';

const images = [
  { src: './hero-2.jpg', alt: 'Girl in the mountains' },
  { src: './hero-3.jpg', alt: 'Sitting man' },
  { src: './hero-4.jpg', alt: 'Three girls.' },
  { src: './hero-5.jpg', alt: 'Man at the seaside.' },
  { src: './hero-6.jpg', alt: 'Venice. ' },
  { src: './hero-7.jpg', alt: 'Paris.' },
  { src: './hero-8.jpg', alt: 'Two girls at the lake.' },
  { src: './hero-9.jpg', alt: 'Cathedral.' },
];

function Hero() {
  const { t } = useTranslation();
  const [action, setAcrion] = useState<string>('Meet');
  const [spanColor, setSpanColor] = useState<string>('hero__span--blue');

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      const actions = ['Talk', 'Meet'];
      const colors = ['hero__span--green', 'hero__span--blue'];
      setAcrion(actions[counter % 2]);
      setSpanColor(colors[counter % 2]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero__element-1">
        <h2 className="hero__header">
          Let's
          <span className={`hero__span ${spanColor}`}>{action}</span>
          Together
        </h2>
      </div>
      {images.map((item, i) => (
        <div key={item.src} className={`hero__element-${2 + i}`}>
          <picture className="hero__picture">
            <img className="hero__img" src={item.src} alt={item.alt} />
          </picture>
        </div>
      ))}

      <div className="hero__element-10">
        <Link className="hero_link" to={ROUTER_PATHS.signup}>
          {t('join_now')}
        </Link>
      </div>
    </section>
  );
}

export default Hero;
