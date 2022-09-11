import { ThemeMode } from 'cocstorage-ui/dist/types';

import { atom } from 'recoil';

import LocalStorage from '@library/localStorage';

import localStorageKeys from '@constants/localStorageKeys';

export const themeDefault: ThemeMode | 'system' = 'system';

export const themeState = atom<ThemeMode | 'system'>({
  key: 'common/themeState',
  default: themeDefault,
  effects: [
    ({ onSet, setSelf }) => {
      const theme = LocalStorage.get<ThemeMode | 'system'>(localStorageKeys.theme) || 'system';

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

export const commonFeedbackDialogState = atom<{
  open: boolean;
  title: string;
  code?: string;
  message?: string;
}>({
  key: 'common/feedbackDialogState',
  default: {
    open: false,
    title: '',
    code: '',
    message: ''
  }
});
