import { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';

import { ThemeType } from 'cocstorage-ui/dist/types';

import { useRecoilState } from 'recoil';

import { themeState } from '@recoil/common/atoms';

import { ThemeProvider } from 'cocstorage-ui';

type ThemeRootProps = HTMLAttributes<HTMLDivElement>;

function ThemeRoot({ children }: PropsWithChildren<ThemeRootProps>) {
  const [theme, setTheme] = useRecoilState(themeState);
  const [themeType, setThemeType] = useState<ThemeType>('light');

  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(theme);
      setThemeType(isDark ? 'dark' : 'light');
    } else {
      setThemeType(theme);
    }
  }, [theme, setTheme]);

  return <ThemeProvider theme={themeType}>{children}</ThemeProvider>;
}

export default ThemeRoot;
