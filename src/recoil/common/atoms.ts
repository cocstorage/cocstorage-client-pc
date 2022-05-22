import { ThemeType } from 'cocstorage-ui/dist/types';

import { atom } from 'recoil';

export const themeDefault: ThemeType | 'system' = 'system';

export const themeState = atom<ThemeType | 'system'>({
  key: 'theme',
  default: themeDefault
});
