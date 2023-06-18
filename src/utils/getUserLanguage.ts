import { LanguageType } from '@/store/lang';

const getUserLanguage = (): LanguageType => {
  const userLnaguage = navigator.language;
  let language: LanguageType = userLnaguage.includes('pl') ? 'PL' : 'EN';
  return language;
};

export default getUserLanguage;
