import SecureLS from 'secure-ls';
import { AuthenticatedUserData } from '@/store/types';

const secureLS = new SecureLS();

export const removeAuthStorage = (): void => {
  localStorage.removeItem('WaveUpInfo');
};

export const setAuthStorage = (user: AuthenticatedUserData) => {
  secureLS.set('WaveUpInfo', user);
};

interface StoredAuthData {
  user: AuthenticatedUserData;
  duration: number;
}

export const getAuthStorage = (): StoredAuthData | null => {
  const user = secureLS.get('WaveUpInfo') as AuthenticatedUserData;

  if (user) {
    const now = new Date().getTime();
    const expirationDate = new Date(user.expiresIn).getTime();
    const remainingTime = expirationDate - now;
    if (remainingTime <= 60000) {
      removeAuthStorage();
      return null;
    }
    return { user, duration: remainingTime };
  }
  return null;
};

export const updateAuthStorage = (data: Partial<AuthenticatedUserData>) => {
  const user = secureLS.get('WaveUpInfo');
  removeAuthStorage();

  if (user) {
    const newUserData = { ...user, ...data };
    setAuthStorage(newUserData);
  }
};
