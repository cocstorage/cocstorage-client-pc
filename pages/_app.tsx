import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { ThemeProvider, GlobalStyles } from 'cocstorage-ui';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@styles/base.css';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta httpEquiv="content-language" content="ko" />
        <meta name="description" content="내가 만들어 운영하는 커뮤니티" />
        <meta name="keywords" content="커뮤니티" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-icon-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3C89FF" />
        <meta name="msapplication-TileColor" content="#3C89FF" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        <title>개념글 저장소</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme="light">
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
