import { useCallback, useRef, useState } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import { RecoilRoot } from 'recoil';

import type { AxiosError } from 'axios';

import dayjs from 'dayjs';

import RelativeTime from 'dayjs/plugin/relativeTime';

import { MessageDialog, PageProgress, ThemeRoot } from '@components/UI/organisms';

import { getErrorMessageByCode } from '@utils';

import 'dayjs/locale/ko';
import '@styles/base.css';

dayjs.locale('ko');
dayjs.extend(RelativeTime);

function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    code: string;
    message: string;
  }>({
    title: '알 수 없는 오류가 발생했어요.',
    code: '',
    message: '문제가 지속된다면 관리자에게 문의해 주세요!'
  });

  const queryClient = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          retry: 1
        }
      },
      mutationCache: new MutationCache({
        onError: (
          error,
          query = {
            shouldBeHandledByGlobalErrorHandler: true
          }
        ) => {
          if (
            !(query as { shouldBeHandledByGlobalErrorHandler: boolean })
              .shouldBeHandledByGlobalErrorHandler
          )
            return;

          const asError = error as AxiosError;

          if (asError && asError.response) {
            const { data = {} } = (asError || {}).response || {};

            setErrorMessage({
              title: getErrorMessageByCode(data.code),
              code: data.code ? data.code : 'NONE',
              message: '문제가 지속된다면 위의 코드와 함께 관리자에게 문의해 주세요!'
            });

            setOpen(true);
          } else {
            setOpen(true);
          }
        }
      }),
      queryCache: new QueryCache({
        onError: (error) => {
          const asError = error as AxiosError;

          if (asError && asError.response) {
            const { data = {} } = (asError || {}).response || {};

            setErrorMessage({
              title: getErrorMessageByCode(data.code),
              code: data.code ? data.code : 'NONE',
              message: '문제가 지속된다면 위의 코드와 함께 관리자에게 문의해 주세요!'
            });

            setOpen(true);
          } else {
            setOpen(true);
          }
        }
      })
    })
  );

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta httpEquiv="content-language" content="ko" />
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
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient.current}>
          <ThemeRoot>
            <PageProgress />
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <MessageDialog open={open} onClose={handleClose} {...errorMessage} />
          </ThemeRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
