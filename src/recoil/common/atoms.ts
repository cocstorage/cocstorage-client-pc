import { ThemeType } from 'cocstorage-ui/dist/types';

import { atom } from 'recoil';

import LocalStorage from '@library/localStorage';

import { localStorageKeys } from '@constants/localStorage';

export const themeDefault: ThemeType | 'system' = 'system';

export const themeState = atom<ThemeType | 'system'>({
  key: 'themeState',
  default: themeDefault,
  effects: [
    ({ onSet, setSelf }) => {
      const theme = LocalStorage.get<ThemeType | 'system'>(localStorageKeys.theme) || 'system';

      setSelf(theme);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.theme);
        } else {
          LocalStorage.set(localStorageKeys.theme, newValue);
        }
      });
    }
  ]
});
