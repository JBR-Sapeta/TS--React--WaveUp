import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { useAppDispatch } from '@/store';
import { setLanguage } from '@/store/lang';

import { LanguageType } from '@/store/types';

import getUserLanguage from '@/utils/getUserLanguage';

import i18n from '@/locales/i18n';

import BaseIcon from '../shared/icons/BaseIcon';

import GB from '@/assets/GB.png';
import PL from '@/assets/PL.png';

import './LanguageChanger.css';

interface Language {
  value: string;
  label: string;
  src: string;
}

interface Languages {
  [props: string]: Language;
}

const LANGUAGES: Languages = {
  PL: { value: 'PL', label: 'Polski (PL)', src: PL },
  EN: { value: 'EN', label: 'English (EN)', src: GB },
};

const modalAnimation = {
  initial: { scale: 0.3 },
  animate: { scale: 1 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

function LanguageChanger() {
  const dispatch = useAppDispatch();
  const buttonElement = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<LanguageType>(() => getUserLanguage());

  const onLanguageChange = (language: LanguageType) => {
    setLang(language);
    dispatch(setLanguage(language));
    setIsOpen((state) => !state);
    i18n.changeLanguage(language.toLowerCase());
  };

  useEffect(() => {
    const handler = (event: globalThis.MouseEvent): void => {
      if (!buttonElement.current) {
        return;
      }
      if (!buttonElement.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="language">
      <button
        ref={buttonElement}
        type="button"
        className="language__current"
        onClick={() => setIsOpen((state) => !state)}
      >
        <img
          className="language__img"
          src={LANGUAGES[lang].src}
          alt="Polski (PL)"
        />
        {LANGUAGES[lang].value}
        {isOpen ? (
          <BaseIcon name="TiArrowSortedUp" />
        ) : (
          <BaseIcon name="TiArrowSortedDown" />
        )}
      </button>
      {isOpen && (
        <motion.div {...modalAnimation} className="language__list">
          {Object.keys(LANGUAGES).map((key) => (
            <button
              key={LANGUAGES[key].value}
              type="button"
              className={`language__item ${
                lang === LANGUAGES[key].value ? 'active' : ''
              }`}
              onClick={() =>
                onLanguageChange(LANGUAGES[key].value as LanguageType)
              }
            >
              <img
                className="language__img"
                src={LANGUAGES[key].src}
                alt={LANGUAGES[key].label}
              />
              {LANGUAGES[key].label}
              <BaseIcon name="MdCheck" />
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default LanguageChanger;
