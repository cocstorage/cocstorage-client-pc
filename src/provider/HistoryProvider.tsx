import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { commonHistoryState } from '@recoil/common/atoms';
import getPathNameByUrl from '@utils/getPathNameByUrl';

const serverSidePages = [
  '/',
  '/notices',
  '/notices/[id]',
  '/storages',
  '/storages/[path]',
  '/storages/[path]/[id]',
  '/storages/[path]/post',
  '/best',
  '/worst'
];

function HistoryProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [history, setHistoryState] = useRecoilState(commonHistoryState);

  const [isGoBack, setIsGoBack] = useState(false);

  useEffect(() => {
    router.beforePopState(() => {
      setIsGoBack(true);
      if (serverSidePages.indexOf(history.object[history.index - 1]) > -1)
        document.cookie = 'isGoBack=true;path=/';

      return true;
    });
  }, [router, history]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const pathname = getPathNameByUrl(url);

      if (isGoBack) {
        setHistoryState({
          index: history.index - 1,
          object: history.object.filter((arr, index) => index < history.object.length - 1)
        });
      } else {
        setHistoryState({
          index: history.index + 1,
          object: [...history.object, pathname]
        });
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events, setHistoryState, history, isGoBack]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (isGoBack) {
        setIsGoBack(false);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events, isGoBack]);

  return children as ReactElement;
}

export default HistoryProvider;
