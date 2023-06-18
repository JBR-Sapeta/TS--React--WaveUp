import { HeroSection, BaseIcon } from '@/components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import './HomePage.css';

const pageAnimation = {
  initial: { y: 600  },
  animate: { y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};


function HomePage() {
  const { t } = useTranslation();
  return (
    <motion.div {...pageAnimation}>
      <HeroSection />
      <section className="features">
        <article className="feature">
          <div className="feature__content  feature__content--right">
            <h3>
              <BaseIcon name="FaUsers" /> {t('home_meet_header')}
            </h3>
            <p>{t('home_meet')}</p>
          </div>
          <picture className="feature__picture feature__picture--right">
            <img className="feature__img" src="./feature-1.jpg" alt="" />
          </picture>
        </article>

        <article className="feature">
          <div className="feature__content feature__content--left">
            <h3>
              <BaseIcon name="IoMdChatboxes" /> {t('home_talk_header')}
            </h3>
            <p>{t('home_talk')}</p>
          </div>
          <picture className="feature__picture feature__picture--left">
            <img className="feature__img" src="./feature-2.jpg" alt="" />
          </picture>
        </article>

        <article className="feature">
          <div className="feature__content feature__content--right">
            <h3>
              <BaseIcon name="IoMdImages" /> {t('home_memories_header')}
            </h3>
            <p>{t('home_memories')}</p>
          </div>
          <picture className="feature__picture feature__picture--right">
            <img className="feature__img" src="./feature-3.jpg" alt="" />
          </picture>
        </article>
      </section>
    </motion.div>
  );
}

export default HomePage;
