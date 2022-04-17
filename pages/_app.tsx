import React from 'react';
import { AppProps } from 'next/app';

import { ThemeProvider, GlobalStyles } from 'cocstorage-ui';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme="light">
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
