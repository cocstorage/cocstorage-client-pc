import { localStorageKeys } from '@constants/localStorage';

const LocalStorage = (() => {
  let localStorage: Storage | null;

  function init(): Storage | null {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  return {
    getInstance() {
      if (localStorage) {
        return localStorage;
      }
      localStorage = init();
      return localStorage;
    },
    get<T>(key: keyof typeof localStorageKeys): T | null {
      if (localStorage) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      const initLocalStorage = LocalStorage.getInstance();

      if (initLocalStorage) {
        const item = initLocalStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }

      return null;
    },
    set<T>(key: keyof typeof localStorageKeys, value: T) {
      if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        const initLocalStorage = LocalStorage.getInstance();

        if (initLocalStorage) {
          initLocalStorage.setItem(key, JSON.stringify(value));
        }
      }
    }
  };
})();

export default LocalStorage;
